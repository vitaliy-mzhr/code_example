
import { put, call, takeLatest } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import cookie from 'js-cookie';

// Actions
import { signup } from '../../actions';
// CONFIG
import FORMS from '../../config/forms';
// Utils
import { registerUser, apiSetToken } from '../../utils/api';
import { parseResponseErrors } from '../../utils/parseResponseErrors';
import { notification } from '../../utils/notification';



export function* signUpSaga({ payload }) {
    try {
        const { first_name, email, password, onSuccessFn } = payload;
        yield put(signup.request());
        yield put(startSubmit(FORMS.SIGN_UP));

        const response = yield call(registerUser, { first_name, email, password });

        const { token, user } = response;
        cookie.set('token', token, { expires: 365 });
        apiSetToken(token);
        yield call(onSuccessFn);

        yield put(stopSubmit(FORMS.SIGN_UP));
        yield put(signup.success(user));
        notification('Congrats for creating an account!');
    } catch (e) {
        const formErrors = parseResponseErrors(e.data);
        yield put(stopSubmit(FORMS.SIGN_UP, formErrors));
        yield put(signup.failure(e));
    }
}

export default function* handleSignUpSaga() {
    yield takeLatest(signup.TRIGGER, signUpSaga);
}
