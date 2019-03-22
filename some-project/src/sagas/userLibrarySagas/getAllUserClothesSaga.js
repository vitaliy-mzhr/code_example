import { put, call, takeLatest, all } from 'redux-saga/effects';

// Actions
import { getAllUserClothes } from '../../actions';
// Utils
import {
    getUserClothesInCartListEntries,
    getUserClothesSavedListEntries,
    getUserClothesViewedListEntries,
    getUserClothesOwnedListEntries
} from '../../utils/api';
// Config
import { USER_COLLECTION_CLOTHES_PER_PAGE } from '../../config';



export function* getAllUserClothesSaga() {
    try {
        const requests = [];
        const offset = 0;
        const limit = USER_COLLECTION_CLOTHES_PER_PAGE;

        yield put(getAllUserClothes.request());
        requests.push(call(getUserClothesInCartListEntries, offset, limit));
        requests.push(call(getUserClothesSavedListEntries, offset, limit));
        requests.push(call(getUserClothesViewedListEntries, offset, limit));
        requests.push(call(getUserClothesOwnedListEntries, offset, limit));

        const response = yield all(requests);
        const [ in_cart_list, saved_list, viewed_list, owned_list ] = response;
        yield put(getAllUserClothes.success({ in_cart_list, saved_list, viewed_list, owned_list }));
    } catch (e) {
        yield put(getAllUserClothes.failure(e));
    }
}

export default function* handleSaga() {
    yield takeLatest(getAllUserClothes.TRIGGER, getAllUserClothesSaga);
}
