import { all, put, call, takeLatest } from 'redux-saga/effects';

import { getCategoryCollection } from '../../actions';
import { getCategoryCollectionData, getCategoryCollectionOutfitsData } from '../../utils/api';
import { COLLECTION_OUTFITS_PER_PAGE } from '../../config';



export function* getCategoryCollectionSaga({payload}) {
    try {
        const {slug, collectionParent, withOutfits} = payload;
        const requests = [];
        const offset = 0;
        const limit = COLLECTION_OUTFITS_PER_PAGE;

        yield put(getCategoryCollection.request({withOutfits}));

        requests.push(call(getCategoryCollectionData, slug));
        if (withOutfits) {
            requests.push(call(getCategoryCollectionOutfitsData, slug, offset, limit));
        }

        const [data, outfits] = yield all(requests);
        data.collectionParent = collectionParent;
        yield put(getCategoryCollection.success({data, outfits, offset, limit, chosenFilters: [], filtersQuery: ''}));

    } catch (e) {
        yield put(getCategoryCollection.failure(e));
    }
}

export default function* handleGetCategoryCollectionSaga() {
    yield takeLatest(getCategoryCollection.TRIGGER, getCategoryCollectionSaga);
}

