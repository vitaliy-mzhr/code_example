import { put, call, takeLatest } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

// Actions
import { loopMe } from '../actions';
// CONFIG
import FORMS from '../config/forms';
// Utils
import { emailSubscription } from '../utils/api';



export function* loopMeSaga({ payload }) {
    try {
        const { email, onSuccessFn } = payload;
        yield put(loopMe.request());
        yield put(startSubmit(FORMS.LOOP_ME_IN));
        yield call(emailSubscription, { email });
        yield call(onSuccessFn);
        yield put(stopSubmit(FORMS.LOOP_ME_IN));
        yield put(loopMe.success());
    } catch (e) {
        yield put(stopSubmit(FORMS.LOOP_ME_IN));
        yield put(loopMe.failure(e));
    }
}

export default function* handleLoopMeSaga() {
    yield takeLatest(loopMe.TRIGGER, loopMeSaga);
}
