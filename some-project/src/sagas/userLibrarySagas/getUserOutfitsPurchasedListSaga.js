import { put, call, takeLatest } from 'redux-saga/effects';

// Actions
import { getUserOutfitsPurchasedList } from '../../actions';
// Utils
import { getUserOutfitsPurchasedListEntries } from '../../utils/api';



export function* getUserOutfitsPurchasedListSaga({ payload }) {
    try {
        const { offset, limit } = payload;
        yield put(getUserOutfitsPurchasedList.request());
        const response = yield call(getUserOutfitsPurchasedListEntries, offset, limit);
        yield put(getUserOutfitsPurchasedList.success({ key: 'purchased_list', data: response }));
    } catch (e) {
        yield put(getUserOutfitsPurchasedList.failure(e));
    }
}

export default function* handleSaga() {
    yield takeLatest(getUserOutfitsPurchasedList.TRIGGER, getUserOutfitsPurchasedListSaga);
}
