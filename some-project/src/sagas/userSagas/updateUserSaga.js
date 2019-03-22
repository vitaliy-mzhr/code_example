import { put, call, takeEvery } from 'redux-saga/effects';

// Actions
import { updateUser } from '../../actions';
// Utils
import { updateUserEntries } from '../../utils/api';



export function* updateUserSaga({ payload }) {
    try {
        const { values, fn, propName } = payload;
        yield put(updateUser.request());
        const user = yield call(updateUserEntries, values);
        fn(propName);
        yield put(updateUser.success(user));
    } catch (e) {
        yield put(updateUser.failure(e));
    }
}

export default function* handleGetUserSaga() {
    yield takeEvery(updateUser.TRIGGER, updateUserSaga);
}
