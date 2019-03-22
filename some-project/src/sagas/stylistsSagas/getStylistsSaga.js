import { put, call, takeLatest } from 'redux-saga/effects';

import { getStylists } from '../../actions';
import { getStylistsData } from '../../utils/api';



export function* getStylistsSaga() {
    try {
        yield put(getStylists.request());
        const stylistsData = yield call(getStylistsData);
        yield put(getStylists.success(stylistsData));
    } catch (e) {
        yield put(getStylists.failure(e));
    }
}

export default function* handleGetStylistsSaga() {
    yield takeLatest(getStylists.TRIGGER, getStylistsSaga);
}
