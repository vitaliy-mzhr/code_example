import { put, call, takeLatest } from 'redux-saga/effects';

// Actions
import { getUser } from '../../actions';
// Utils
import { getUserEntries } from '../../utils/api';



export function* getUserSaga() {
    try {
        yield put(getUser.request());
        const user = yield call(getUserEntries);
        yield put(getUser.success(user));
    } catch (e) {
        yield put(getUser.failure(e));
    }
}

export default function* handleGetUserSaga() {
    yield takeLatest(getUser.TRIGGER, getUserSaga);
}
