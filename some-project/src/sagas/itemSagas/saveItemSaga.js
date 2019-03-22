import { put, call, takeLatest } from 'redux-saga/effects';

import { saveItem } from '../../actions';
import { saveItemToLibrary } from '../../utils/api';



export function* saveItemSaga({payload}) {
    try {
        const {id, clothesType} = payload;

        yield put(saveItem.request());
        yield call(saveItemToLibrary, id);
        yield put(saveItem.success({id, clothesType}));
    } catch (e) {
        yield put(saveItem.failure(e));
    }
}

export default function* handleSaveItemSaga() {
    yield takeLatest(saveItem.TRIGGER, saveItemSaga);
}
