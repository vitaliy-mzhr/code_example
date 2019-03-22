import { put, call, takeLatest, select } from 'redux-saga/effects';
import get from 'lodash/fp/get';

import { getOutfit } from '../../actions';
import { getOutfitData } from '../../utils/api';



const getOutfits = (state) => get('collection.outfits.results', state) || [];

export function* getOutfitSaga({payload}) {
    try {
        const {outfitId, isUpdate} = payload;

        yield put(getOutfit.request());
        const outfit = yield call(getOutfitData, outfitId);
        const outfitsAvailable = yield select(getOutfits);

        for (let i = 0, l = outfitsAvailable.length; i < l; i++) {
            if (outfitsAvailable[i].outfit_id === outfit.outfit_id) {
                const next = get(`[${i+1}].outfit_id`, outfitsAvailable);
                const prev = get(`[${i-1}].outfit_id`, outfitsAvailable);
                if (next) outfit.nextOutfit = next;
                if (prev) outfit.prevOutfit = prev;
                break;
            }
        }

        yield put(getOutfit.success({data: outfit, isUpdate}));

    } catch (e) {
        yield put(getOutfit.failure(e));
    }
}

export default function* handleGetOutfitSaga() {
    yield takeLatest(getOutfit.TRIGGER, getOutfitSaga);
}
