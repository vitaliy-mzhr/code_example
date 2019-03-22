import { put, call, takeLatest } from 'redux-saga/effects';

import { getCategory } from '../actions';
import { getCategoryData } from '../utils/api';



export function* getCategorySaga({payload}) {
    try {
        const {id, type} = payload;

        yield put(getCategory.request());
        const categoryData = yield call(getCategoryData, type, id);
        yield put(getCategory.success(categoryData));
    } catch (e) {
        yield put(getCategory.failure(e));
    }
}

export default function* handleGetCategorySaga() {
    yield takeLatest(getCategory.TRIGGER, getCategorySaga);
}
