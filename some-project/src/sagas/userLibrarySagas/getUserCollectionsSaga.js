import { put, call, takeLatest } from 'redux-saga/effects';

// Actions
import { getUserCollections } from '../../actions';
// Utils
import { getUserCollectionsEntries } from '../../utils/api';



export function* getUserCollectionsSaga() {
    try {
        yield put(getUserCollections.request());
        const userCollections = yield call(getUserCollectionsEntries);
        yield put(getUserCollections.success(userCollections));
    } catch (e) {
        yield put(getUserCollections.failure(e));
    }
}

export default function* handleSaga() {
    yield takeLatest(getUserCollections.TRIGGER, getUserCollectionsSaga);
}
