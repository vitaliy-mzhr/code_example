import { put, call, takeLatest } from 'redux-saga/effects';

// Actions
import { getUserOutfitsSavedList } from '../../actions';
// Utils
import { getUserOutfitsSavedListEntries } from '../../utils/api';



export function* getUserOutfitsSavedListSaga({ payload }) {
    try {
        const { offset, limit } = payload;
        yield put(getUserOutfitsSavedList.request());
        const response = yield call(getUserOutfitsSavedListEntries, offset, limit);
        yield put(getUserOutfitsSavedList.success({ key: 'saved_list', data: response }));
    } catch (e) {
        yield put(getUserOutfitsSavedList.failure(e));
    }
}

export default function* handleSaga() {
    yield takeLatest(getUserOutfitsSavedList.TRIGGER, getUserOutfitsSavedListSaga);
}
