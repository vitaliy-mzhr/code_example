import { put, call, takeEvery } from 'redux-saga/effects';

import { getCategoryCollectionOutfits, getClothesOutfits } from '../../actions';
import { getClothesOutfitsData } from '../../utils/api';



export function* getClothesOutfitsSaga({payload}) {
    try {
        const {clothesSlug1, slug, offset, limit, chosenFilters, filtersQuery = '', loadMore} = payload;

        yield put(getCategoryCollectionOutfits.request());

        const outfits = yield call(getClothesOutfitsData, clothesSlug1, slug, offset, limit, filtersQuery);

        yield put(getCategoryCollectionOutfits.success({outfits, offset, limit, chosenFilters, filtersQuery, loadMore}));

    } catch (e) {
        yield put(getCategoryCollectionOutfits.failure(e));
    }
}

export default function* handleGetCategoryCollectionOutfitsSaga() {
    yield takeEvery(getClothesOutfits.TRIGGER, getClothesOutfitsSaga);
}

