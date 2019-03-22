import { all, fork } from 'redux-saga/effects';

import handleGetOutfitSaga from './getOutfitSaga';
import handleGetOutfitPointSaga from './getOutfitPointSaga';
import handleGetOutfitCollectionsSaga from './getOutfitCollectionsSaga';
import handleGetOutfitCommentsSaga from './getOutfitCommentsSaga';
import handleSaveOutfitSaga from './saveOutfitSaga';
import handleRemoveOutfitSaga from './removeOutfitSaga';



export default function* outfitSagas() {
    yield all([
        fork(handleGetOutfitSaga),
        fork(handleGetOutfitPointSaga),
        fork(handleGetOutfitCollectionsSaga),
        fork(handleGetOutfitCommentsSaga),
        fork(handleSaveOutfitSaga),
        fork(handleRemoveOutfitSaga)
    ]);
}
