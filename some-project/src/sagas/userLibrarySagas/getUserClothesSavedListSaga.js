import { put, call, takeLatest } from 'redux-saga/effects';

// Actions
import { getUserClothesSavedList } from '../../actions';
// Utils
import { getUserClothesSavedListEntries } from '../../utils/api';



export function* getUserClothesSavedListSaga({ payload }) {
    try {
        const { offset, limit } = payload;
        yield put(getUserClothesSavedList.request());
        const response = yield call(getUserClothesSavedListEntries, offset, limit);
        yield put(getUserClothesSavedList.success({ key: 'saved_list', data: response }));
    } catch (e) {
        yield put(getUserClothesSavedList.failure(e));
    }
}

export default function* handleSaga() {
    yield takeLatest(getUserClothesSavedList.TRIGGER, getUserClothesSavedListSaga);
}
