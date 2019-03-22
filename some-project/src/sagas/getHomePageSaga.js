import { put, call, takeLatest } from 'redux-saga/effects';

import { getHomePage } from '../actions';
import { getHomeData } from '../utils/api';



export function* getHomePageSaga() {
    try {
        yield put(getHomePage.request());
        const homeData = yield call(getHomeData);
        yield put(getHomePage.success(homeData));
    } catch (e) {
        yield put(getHomePage.failure(e));
    }
}

export default function* handleGetHomePageSaga() {
    yield takeLatest(getHomePage.TRIGGER, getHomePageSaga);
}
