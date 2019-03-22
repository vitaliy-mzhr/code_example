import { put, call, takeLatest } from 'redux-saga/effects';

// Actions
import { getUserClothesViewedList } from '../../actions';
// Utils
import { getUserClothesViewedListEntries } from '../../utils/api';



export function* getUserClothesViewedListSaga({ payload }) {
    try {
        const { offset, limit } = payload;
        yield put(getUserClothesViewedList.request());
        const response = yield call(getUserClothesViewedListEntries, offset, limit);
        yield put(getUserClothesViewedList.success({ key: 'viewed_list', data: response }));
    } catch (e) {
        yield put(getUserClothesViewedList.failure(e));
    }
}

export default function* handleSaga() {
    yield takeLatest(getUserClothesViewedList.TRIGGER, getUserClothesViewedListSaga);
}
