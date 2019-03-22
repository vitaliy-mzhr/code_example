import { all, put, call, takeLatest } from 'redux-saga/effects';

import { getStylist } from '../../actions';
import { getStylistData, getStylistOutfitsData } from '../../utils/api';
import { COLLECTION_OUTFITS_PER_PAGE } from '../../config';



export function* getStylistSaga({payload}) {
    try {
        const {slug, withOutfits} = payload;
        const requests = [];
        const offset = 0;
        const limit = COLLECTION_OUTFITS_PER_PAGE;

        yield put(getStylist.request({withOutfits}));

        requests.push(call(getStylistData, slug));
        if (withOutfits) {
            requests.push(call(getStylistOutfitsData, slug, offset, limit));
        }

        const [data, outfits = {}] = yield all(requests);
        yield put(getStylist.success({data, outfits, offset, limit, chosenFilters: [], filtersQuery: ''}));

    } catch (e) {
        yield put(getStylist.failure(e));
    }
}

export default function* handleGetStylistSaga() {
    yield takeLatest(getStylist.TRIGGER, getStylistSaga);
}

