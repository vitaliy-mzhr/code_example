import { put, call, takeLatest } from 'redux-saga/effects';

import { userAddCollection } from '../../actions';
import { addCollectionToLibrary } from '../../utils/api';



export function* userAddCollectionSaga({payload}) {
    try {
        const {slug, categoryId} = payload;

        yield put(userAddCollection.request());
        yield call(addCollectionToLibrary, slug);
        yield put(userAddCollection.success({slug, categoryId}));
    } catch (e) {
        yield put(userAddCollection.failure(e));
    }
}

export default function* handleUserAddCollectionSaga() {
    yield takeLatest(userAddCollection.TRIGGER, userAddCollectionSaga);
}
