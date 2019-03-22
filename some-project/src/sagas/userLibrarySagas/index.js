import { all, fork } from 'redux-saga/effects';

import handleGetUserCollectionsSaga from './getUserCollectionsSaga';
import handleGetUserCollectionsDetailsSaga from './getUserCollectionsDetailsSaga';
import handleGetUserStylistsSaga from './getUserStylistsSaga';
import handleGetAllUserOutfitsSaga from './getAllUserOutfitsSaga';
import handleGetUserOutfitsSavedListSaga from './getUserOutfitsSavedListSaga';
import handleGetUserOutfitsPurchasedListSaga from './getUserOutfitsPurchasedListSaga';
import handleGetUserOutfitsViewedListSaga from './getUserOutfitsViewedListSaga';
import handleGetAllUserClothesSaga from './getAllUserClothesSaga';
import handleGetUserClothesInCartListSaga from './getUserClothesInCartListSaga';
import handleGetUserClothesSavedListSaga from './getUserClothesSavedListSaga';
import handleGetUserClothesViewedListSaga from './getUserClothesViewedListSaga';
import handleGetUserClothesOwnedListSaga from './getUserClothesOwnedListSaga';



export default function* userLibrarySagas() {
    yield all([
        fork(handleGetUserCollectionsSaga),
        fork(handleGetUserCollectionsDetailsSaga),
        fork(handleGetUserStylistsSaga),
        fork(handleGetAllUserOutfitsSaga),
        fork(handleGetUserOutfitsSavedListSaga),
        fork(handleGetUserOutfitsPurchasedListSaga),
        fork(handleGetUserOutfitsViewedListSaga),
        fork(handleGetAllUserClothesSaga),
        fork(handleGetUserClothesInCartListSaga),
        fork(handleGetUserClothesSavedListSaga),
        fork(handleGetUserClothesViewedListSaga),
        fork(handleGetUserClothesOwnedListSaga)
    ]);
}
