import { put, call, takeEvery } from 'redux-saga/effects';

import { getCategoryCollectionOutfits } from '../../actions';
import { getCategoryCollectionOutfitsData } from '../../utils/api';



export function* getCategoryCollectionOutfitsSaga({payload}) {
    try {
        const {slug, offset, limit, chosenFilters, filtersQuery = '', loadMore} = payload;

        yield put(getCategoryCollectionOutfits.request());

        const outfits = yield call(getCategoryCollectionOutfitsData, slug, offset, limit, filtersQuery);

        yield put(getCategoryCollectionOutfits.success({outfits, offset, limit, chosenFilters, filtersQuery, loadMore}));

    } catch (e) {
        yield put(getCategoryCollectionOutfits.failure(e));
    }
}

export default function* handleGetCategoryCollectionOutfitsSaga() {
    yield takeEvery(getCategoryCollectionOutfits.TRIGGER, getCategoryCollectionOutfitsSaga);
}

