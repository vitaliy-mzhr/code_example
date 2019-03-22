import { put, call, takeLatest } from 'redux-saga/effects';

import { boughtItem } from '../../actions';
import { finallyBoughtItem } from '../../utils/api';



export function* boughtItemSaga({payload}) {
    try {
        const {id} = payload;

        yield put(boughtItem.request());
        yield call(finallyBoughtItem, id);
        yield put(boughtItem.success({id}));
    } catch (e) {
        yield put(boughtItem.failure(e));
    }
}

export default function* handleBoughtItemSaga() {
    yield takeLatest(boughtItem.TRIGGER, boughtItemSaga);
}
