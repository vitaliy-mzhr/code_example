import { put, call, takeLatest } from 'redux-saga/effects';

import { inCartItem } from '../../actions';
import { putItemToCart } from '../../utils/api';



export function* putItemToCartSaga({payload}) {
    try {
        const {id} = payload;

        yield put(inCartItem.request());
        yield call(putItemToCart, id);
        yield put(inCartItem.success({id}));
    } catch (e) {
        yield put(inCartItem.failure(e));
    }
}

export default function* handlePutItemToCartSaga() {
    yield takeLatest(inCartItem.TRIGGER, putItemToCartSaga);
}
