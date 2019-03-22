import { put, call, takeLatest } from 'redux-saga/effects';

import { removeItem } from '../../actions';
import { removeItemFromLibrary } from '../../utils/api';



export function* removeItemSaga({payload}) {
    try {
        const {id, clothesType} = payload;

        yield put(removeItem.request());
        yield call(removeItemFromLibrary, id);
        yield put(removeItem.success({id, clothesType}));
    } catch (e) {
        yield put(removeItem.failure(e));
    }
}

export default function* handleRemoveItemSaga() {
    yield takeLatest(removeItem.TRIGGER, removeItemSaga);
}
