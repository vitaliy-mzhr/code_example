import { put, call, takeLatest, all } from 'redux-saga/effects';

// Actions
import { getAllUserOutfits } from '../../actions';
// Utils
import { getUserOutfitsSavedListEntries, getUserOutfitsPurchasedListEntries, getUserOutfitsViewedListEntries } from '../../utils/api';
// Config
import { USER_COLLECTION_OUTFITS_PER_PAGE } from '../../config';



export function* getAllUserOutfitsSaga() {
    try {
        const requests = [];
        const offset = 0;
        const limit = USER_COLLECTION_OUTFITS_PER_PAGE;

        yield put(getAllUserOutfits.request());
        requests.push(call(getUserOutfitsSavedListEntries, offset, limit));
        requests.push(call(getUserOutfitsPurchasedListEntries, offset, limit));
        requests.push(call(getUserOutfitsViewedListEntries, offset, limit));

        const response = yield all(requests);
        const [ saved_list, purchased_list, viewed_list ] = response;
        yield put(getAllUserOutfits.success({ saved_list, purchased_list, viewed_list }));
    } catch (e) {
        yield put(getAllUserOutfits.failure(e));
    }
}

export default function* handleSaga() {
    yield takeLatest(getAllUserOutfits.TRIGGER, getAllUserOutfitsSaga);
}
