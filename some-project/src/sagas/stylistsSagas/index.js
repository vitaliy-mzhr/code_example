import { all, fork } from 'redux-saga/effects';

import handleGetStylistsSaga from './getStylistsSaga';
import handleGetStylistSaga from './getStylistSaga';
import handleGetStylistOutfitsSaga from './getStylistOutfitsSaga';
import handleFollowStylistSaga from './followStylistSaga';
import handleUnfollowStylistSaga from './unfollowStylistSaga';



export default function* stylistsSagas() {
    yield all([
        fork(handleGetStylistsSaga),
        fork(handleGetStylistSaga),
        fork(handleGetStylistOutfitsSaga),
        fork(handleFollowStylistSaga),
        fork(handleUnfollowStylistSaga)
    ]);
}
