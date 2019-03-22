import { put, call, takeEvery } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

// Actions
import { updateUserPassword } from '../../actions';
// CONFIG
import FORMS from '../../config/forms';
// Utils
import { updateUserPasswordEntries } from '../../utils/api';
import { parseResponseErrors } from '../../utils/parseResponseErrors';



export function* updateUserPasswordSaga({ payload }) {
    try {
        const { values, onSuccessFn } = payload;
        yield put(updateUserPassword.request());
        yield put(startSubmit(FORMS.CHANGE_PASSWORD));

        yield call(updateUserPasswordEntries, values);

        yield call(onSuccessFn);
        yield put(stopSubmit(FORMS.CHANGE_PASSWORD));
        yield put(updateUserPassword.success());
    } catch (e) {
        const formErrors = parseResponseErrors(e.data);
        yield put(stopSubmit(FORMS.CHANGE_PASSWORD, formErrors));
        yield put(updateUserPassword.failure(e));
    }
}

export default function* handleSaga() {
    yield takeEvery(updateUserPassword.TRIGGER, updateUserPasswordSaga);
}
