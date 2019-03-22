import { all, fork } from 'redux-saga/effects';

import handleAuthSagas from './authSagas';
import handleUserSagas from './userSagas';
import handleUserLibrarySagas from './userLibrarySagas';
import handleCollectionSagas from './collectionSagas';
import handleStylistsSagas from './stylistsSagas';
import handleClothesSagas from './clothesSagas';
import handleOutfitSagas from './outfitSagas';
import handleItemSagas from './itemSagas';
import handleGetMenuSaga from './getMenuSaga';
import handleLoopMeSaga from './loopMeSaga';
import handleGetHomePageSaga from './getHomePageSaga';
import handleGetCategorySaga from './getCategorySaga';



export default function* spawnSaga() {
    yield all([
        fork(handleAuthSagas),
        fork(handleUserSagas),
        fork(handleUserLibrarySagas),
        fork(handleCollectionSagas),
        fork(handleStylistsSagas),
        fork(handleClothesSagas),
        fork(handleOutfitSagas),
        fork(handleItemSagas),
        fork(handleGetMenuSaga),
        fork(handleLoopMeSaga),
        fork(handleGetHomePageSaga),
        fork(handleGetCategorySaga)
    ]);
}

