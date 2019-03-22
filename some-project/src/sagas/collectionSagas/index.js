import { all, fork } from 'redux-saga/effects';

import handleGetCategoryCollectionSaga from './getCategoryCollectionSaga';
import handleGetCategoryCollectionOutfitsSaga from './getCategoryCollectionOutfitsSaga';
import handleUserAddCollectionSaga from './userAddCollectionSaga';
import handleUserRemoveCollectionSaga from './userRemoveCollectionSaga';



export default function* collectionSagas() {
    yield all([
        fork(handleGetCategoryCollectionSaga),
        fork(handleGetCategoryCollectionOutfitsSaga),
        fork(handleUserAddCollectionSaga),
        fork(handleUserRemoveCollectionSaga)
    ]);
}
