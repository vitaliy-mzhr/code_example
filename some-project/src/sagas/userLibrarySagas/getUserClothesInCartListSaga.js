import { put, call, takeLatest } from 'redux-saga/effects';

// Actions
import { getUserClothesInCartList } from '../../actions';
// Utils
import { getUserClothesInCartListEntries } from '../../utils/api';



export function* getUserClothesInCartListSaga({ payload }) {
    try {
        const { offset, limit } = payload;
        yield put(getUserClothesInCartList.request());
        const response = yield call(getUserClothesInCartListEntries, offset, limit);
        yield put(getUserClothesInCartList.success({ key: 'in_cart_list', data: response }));
    } catch (e) {
        yield put(getUserClothesInCartList.failure(e));
    }
}

export default function* handleSaga() {
    yield takeLatest(getUserClothesInCartList.TRIGGER, getUserClothesInCartListSaga);
}
