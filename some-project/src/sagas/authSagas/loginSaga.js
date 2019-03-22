
import { put, call, takeLatest } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import cookie from 'js-cookie';

// Actions
import { login } from '../../actions';
// CONFIG
import FORMS from '../../config/forms';
// Utils
import { loginUser, apiSetToken } from '../../utils/api';
import { parseResponseErrors } from '../../utils/parseResponseErrors';
import { notification } from '../../utils/notification';



export function* loginSaga({ payload }) {
    try {
        const { email, password, onSuccessFn } = payload;
        yield put(login.request());
        yield put(startSubmit(FORMS.LOGIN));
        const response = yield call(loginUser, { email, password });

        const { token, user } = response;
        cookie.set('token', token, { expires: 365 });
        apiSetToken(token);
        yield call(onSuccessFn);

        yield put(stopSubmit(FORMS.LOGIN));
        yield put(login.success(user));
        notification('You are signed in to your account');
    } catch (e) {
        const formErrors = parseResponseErrors(e.data);
        yield put(stopSubmit(FORMS.LOGIN, formErrors));
        yield put(login.failure(e));
    }
}

export default function* handleLoginSaga() {
    yield takeLatest(login.TRIGGER, loginSaga);
}
