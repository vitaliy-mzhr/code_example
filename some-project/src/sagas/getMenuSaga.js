import { put, call, takeLatest } from 'redux-saga/effects';

import { getMenu } from '../actions';
import { getMenuEntries } from '../utils/api';



export function* getMenuSaga() {
    try {
        yield put(getMenu.request());
        const menu = yield call(getMenuEntries);
        yield put(getMenu.success(menu));
    } catch (e) {
        yield put(getMenu.failure(e));
    }
}

export default function* handleGetMenuSaga() {
    yield takeLatest(getMenu.TRIGGER, getMenuSaga);
}
