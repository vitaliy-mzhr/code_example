import { put, call, takeLatest } from 'redux-saga/effects';

import { userRemoveCollection } from '../../actions';
import { removeCollectionFromLibrary } from '../../utils/api';



export function* userRemoveCollectionSaga({payload}) {
    try {
        const {slug, categoryId} = payload;

        yield put(userRemoveCollection.request());
        yield call(removeCollectionFromLibrary, slug);
        yield put(userRemoveCollection.success({slug, categoryId}));
    } catch (e) {
        yield put(userRemoveCollection.failure(e));
    }
}

export default function* handleUserRemoveCollectionSaga() {
    yield takeLatest(userRemoveCollection.TRIGGER, userRemoveCollectionSaga);
}
