import { put, call, takeEvery } from 'redux-saga/effects';

import { getStylistOutfits } from '../../actions';
import { getStylistOutfitsData } from '../../utils/api';



export function* getStylistOutfitsSaga({payload}) {
    try {
        const {slug, offset, limit, chosenFilters = [], filtersQuery = '', loadMore} = payload;

        yield put(getStylistOutfits.request());

        const outfits = yield call(getStylistOutfitsData, slug, offset, limit, filtersQuery);

        yield put(getStylistOutfits.success({outfits, offset, limit, chosenFilters, filtersQuery, loadMore}));

    } catch (e) {
        yield put(getStylistOutfits.failure(e));
    }
}

export default function* handleGetStylistOutfitsSaga() {
    yield takeEvery(getStylistOutfits.TRIGGER, getStylistOutfitsSaga);
}

