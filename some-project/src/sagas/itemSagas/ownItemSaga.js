import { put, call, takeLatest } from 'redux-saga/effects';

import { ownItem } from '../../actions';
import { ownItemToLibrary } from '../../utils/api';



export function* ownItemSaga({payload}) {
    try {
        const {id} = payload;

        yield put(ownItem.request());
        yield call(ownItemToLibrary, id);
        yield put(ownItem.success({id}));
    } catch (e) {
        yield put(ownItem.failure(e));
    }
}

export default function* handleOwnItemSaga() {
    yield takeLatest(ownItem.TRIGGER, ownItemSaga);
}
