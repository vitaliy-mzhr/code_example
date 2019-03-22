import { put, call, takeLatest } from 'redux-saga/effects';

// Actions
import { getUserClothesOwnedList } from '../../actions';
// Utils
import { getUserClothesOwnedListEntries } from '../../utils/api';



export function* getUserClothesOwnedListSaga({ payload }) {
    try {
        const { offset, limit } = payload;
        yield put(getUserClothesOwnedList.request());
        const response = yield call(getUserClothesOwnedListEntries, offset, limit);
        yield put(getUserClothesOwnedList.success({ key: 'owned_list', data: response }));
    } catch (e) {
        yield put(getUserClothesOwnedList.failure(e));
    }
}

export default function* handleSaga() {
    yield takeLatest(getUserClothesOwnedList.TRIGGER, getUserClothesOwnedListSaga);
}
