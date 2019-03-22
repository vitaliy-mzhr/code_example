import { put, call, takeLatest } from 'redux-saga/effects';

// Actions
import { getUserStylists } from '../../actions';
// Utils
import { getUserStylistsEntries } from '../../utils/api';



export function* getUserStylistsSaga() {
    try {
        yield put(getUserStylists.request());
        const userCollections = yield call(getUserStylistsEntries);
        yield put(getUserStylists.success(userCollections));
    } catch (e) {
        yield put(getUserStylists.failure(e));
    }
}

export default function* handleSaga() {
    yield takeLatest(getUserStylists.TRIGGER, getUserStylistsSaga);
}
