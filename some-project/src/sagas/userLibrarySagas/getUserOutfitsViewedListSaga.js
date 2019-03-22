import { put, call, takeLatest } from 'redux-saga/effects';

// Actions
import { getUserOutfitsViewedList } from '../../actions';
// Utils
import { getUserOutfitsViewedListEntries } from '../../utils/api';



export function* getUserOutfitsViewedListSaga({ payload }) {
    try {
        const { offset, limit } = payload;
        yield put(getUserOutfitsViewedList.request());
        const response = yield call(getUserOutfitsViewedListEntries, offset, limit);
        yield put(getUserOutfitsViewedList.success({ key: 'viewed_list', data: response }));
    } catch (e) {
        yield put(getUserOutfitsViewedList.failure(e));
    }
}

export default function* handleSaga() {
    yield takeLatest(getUserOutfitsViewedList.TRIGGER, getUserOutfitsViewedListSaga);
}
