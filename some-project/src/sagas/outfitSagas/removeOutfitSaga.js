import { put, call, takeLatest } from 'redux-saga/effects';

import { removeOutfit } from '../../actions';
import { removeOutfitFromLibrary } from '../../utils/api';




export function* removeOutfitSaga({payload}) {
    try {
        const {outfitId} = payload;

        yield put(removeOutfit.request());
        yield call(removeOutfitFromLibrary, outfitId);
        yield put(removeOutfit.success());

    } catch (e) {
        yield put(removeOutfit.failure(e));
    }
}

export default function* handleRemoveOutfitSaga() {
    yield takeLatest(removeOutfit.TRIGGER, removeOutfitSaga);
}
