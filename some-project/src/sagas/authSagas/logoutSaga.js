
import { put, call, takeLatest } from 'redux-saga/effects';

// Actions
import { logout } from '../../actions';
// Utils
import { logoutUser } from '../../utils/api';
import { LogoutHelper } from '../../utils/authHelpers';
import { notification } from '../../utils/notification';



export function* logoutSaga() {
    try {
        yield put(logout.request());
        yield call(logoutUser);

        LogoutHelper();

        yield put(logout.success());
        notification('Signed out of your account');
    } catch (e) {
        yield put(logout.failure(e));
    }
}

export default function* handleLogoutSaga() {
    yield takeLatest(logout.TRIGGER, logoutSaga);
}
