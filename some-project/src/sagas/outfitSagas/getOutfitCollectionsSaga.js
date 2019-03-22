import { put, call, takeLatest } from 'redux-saga/effects';

import { getOutfitCollections } from '../../actions';
import { getOutfitCollectionsData } from '../../utils/api';



export function* getOutfitCollectionsSaga({payload}) {
    try {
        const {outfitId} = payload;

        yield put(getOutfitCollections.request());
        const outfitCollections = yield call(getOutfitCollectionsData, outfitId);
        yield put(getOutfitCollections.success({data: outfitCollections}));

    } catch (e) {
        yield put(getOutfitCollections.failure(e));
    }
}

export default function* handleGetOutfitCollections() {
    yield takeLatest(getOutfitCollections.TRIGGER, getOutfitCollectionsSaga);
}
