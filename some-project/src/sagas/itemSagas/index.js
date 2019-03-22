import { all, fork } from 'redux-saga/effects';

import handleOwnItemSaga from './ownItemSaga';
import handleSaveItemSaga from './saveItemSaga';
import handleRemoveItemSaga from './removeItemSaga';
import handleFinallyBoughtItemSaga from './finallyBoughtItemSaga';
import handlePutItemToCartSaga from './putItemToCartSaga';



export default function* itemSagas() {
    yield all([
        fork(handleOwnItemSaga),
        fork(handleSaveItemSaga),
        fork(handleRemoveItemSaga),
        fork(handleFinallyBoughtItemSaga),
        fork(handlePutItemToCartSaga)
    ]);
}
