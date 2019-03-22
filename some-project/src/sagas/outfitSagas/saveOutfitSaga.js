import { put, call, takeLatest } from 'redux-saga/effects';

import { saveOutfit } from '../../actions';
import { saveOutfitToLibrary } from '../../utils/api';




export function* saveOutfitSaga({payload}) {
    try {
        const {outfitId} = payload;

        yield put(saveOutfit.request());
        yield call(saveOutfitToLibrary, outfitId);
        yield put(saveOutfit.success());

    } catch (e) {
        yield put(saveOutfit.failure(e));
    }
}

export default function* handleSaveOutfitSaga() {
    yield takeLatest(saveOutfit.TRIGGER, saveOutfitSaga);
}
