import { END } from 'redux-saga';



export default function monitorSagas(store) {
    store.dispatch(END);
    return Promise.resolve(store.sagaTask.done);
}
