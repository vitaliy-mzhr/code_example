import { put, call, takeLatest } from 'redux-saga/effects';

import { unfollowStylist } from '../../actions';
import { userUnfollowStylists } from '../../utils/api';



export function* unfollowStylistSaga({payload}) {
    try {
        const {slug} = payload;

        yield put(unfollowStylist.request());
        yield call(userUnfollowStylists, slug);
        yield put(unfollowStylist.success({slug}));
    } catch (e) {
        yield put(unfollowStylist.failure(e));
    }
}

export default function* handleUnfollowStylistSaga() {
    yield takeLatest(unfollowStylist.TRIGGER, unfollowStylistSaga);
}
