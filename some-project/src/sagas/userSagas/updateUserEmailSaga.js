import { put, call, takeEvery } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

// Actions
import { updateUserEmail } from '../../actions';
// CONFIG
import FORMS from '../../config/forms';
// Utils
import { updateUserEntries } from '../../utils/api';
import { parseResponseErrors } from '../../utils/parseResponseErrors';



export function* updateUserEmailSaga({ payload }) {
    try {
        const { values, onSuccessFn } = payload;
        yield put(updateUserEmail.request());
        yield put(startSubmit(FORMS.CHANGE_EMAIL));

        const user = yield call(updateUserEntries, values);

        yield call(onSuccessFn);
        yield put(stopSubmit(FORMS.CHANGE_EMAIL));
        yield put(updateUserEmail.success(user));
    } catch (e) {
        const formErrors = parseResponseErrors(e.data);
        yield put(stopSubmit(FORMS.CHANGE_EMAIL, formErrors));
        yield put(updateUserEmail.failure(e));
    }
}

export default function* handleSaga() {
    yield takeEvery(updateUserEmail.TRIGGER, updateUserEmailSaga);
}
