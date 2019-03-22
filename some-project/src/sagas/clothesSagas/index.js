import { all, fork } from 'redux-saga/effects';

import handleGetClothesSaga from './getClothesSaga';
import handleGetClothesOutfitsSaga from './getClothesOutfitsSaga';



export default function* clothesSagas() {
    yield all([
        fork(handleGetClothesSaga),
        fork(handleGetClothesOutfitsSaga)
    ]);
}
