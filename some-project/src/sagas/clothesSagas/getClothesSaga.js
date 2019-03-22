import { all, put, call, takeLatest } from 'redux-saga/effects';

import { getCategoryCollection, getClothes } from '../../actions';
import { getClothesData, getClothesOutfitsData } from '../../utils/api';
import { COLLECTION_OUTFITS_PER_PAGE } from '../../config';



export function* getClothesSaga({payload}) {
    try {
        const {clothesSlug1, clothesSlug2, withOutfits} = payload;
        const requests = [];
        const offset = 0;
        const limit = COLLECTION_OUTFITS_PER_PAGE;

        yield put(getCategoryCollection.request({withOutfits}));

        requests.push(call(getClothesData, clothesSlug1, clothesSlug2));
        if (withOutfits) {
            requests.push(call(getClothesOutfitsData, clothesSlug1, clothesSlug2, offset, limit));
        }

        const [data, outfits = {}] = yield all(requests);
        data.parentSlug = clothesSlug1;
        yield put(getCategoryCollection.success({data, outfits, offset, limit, chosenFilters: [], filtersQuery: ''}));

    } catch (e) {
        yield put(getCategoryCollection.failure(e));
    }
}

export default function* handleGetClothesSaga() {
    yield takeLatest(getClothes.TRIGGER, getClothesSaga);
}

