import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import cookie from 'js-cookie';

import rootReducer from './reducers';
import rootSaga from './sagas';
import { apiSetInterceptor } from './utils/api/interceptor';
import { apiSetToken } from './utils/api';



const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const {composeWithDevTools} = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};


function configureStore(initialState = {}) {
    const store = createStore(rootReducer, initialState, bindMiddleware([sagaMiddleware]));

    if (process.browser) {
        const token = cookie.get('token');
        if (token) apiSetToken(token);
    }

    store.runSagaTask = () => {
        store.sagaTask = sagaMiddleware.run(rootSaga);
    };

    apiSetInterceptor(store);
    store.runSagaTask();

    return store;
}

export default configureStore;
