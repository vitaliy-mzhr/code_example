import { applyMiddleware, createStore, Store } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from '../saga';
import { addExpandedProps } from '../app/Home/redux/middleware';

const sagaMiddleware = createSagaMiddleware();

export const store: Store<{}> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, addExpandedProps)));

sagaMiddleware.run(rootSaga);
