import { put, call, takeLatest } from 'redux-saga/effects';

import { getOutfitComments } from '../../actions';
import { getOutfitCommentsData } from '../../utils/api';



export function* getOutfitCommentsSaga({payload}) {
    try {
        const {outfitId} = payload;

        yield put(getOutfitComments.request());
        const outfitComments = yield call(getOutfitCommentsData, outfitId);
        yield put(getOutfitComments.success({data: outfitComments}));

    } catch (e) {
        yield put(getOutfitComments.failure(e));
    }
}

export default function* handleGetOutfitComments() {
    yield takeLatest(getOutfitComments.TRIGGER, getOutfitCommentsSaga);
}
