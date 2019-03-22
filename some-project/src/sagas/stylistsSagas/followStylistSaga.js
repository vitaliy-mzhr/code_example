import { put, call, takeLatest } from 'redux-saga/effects';

import { followStylist } from '../../actions';
import { userFollowStylists } from '../../utils/api';



export function* followStylistSaga({payload}) {
    try {
        const {slug} = payload;

        yield put(followStylist.request());
        yield call(userFollowStylists, slug);
        yield put(followStylist.success({slug}));
    } catch (e) {
        yield put(followStylist.failure(e));
    }
}

export default function* handleFollowStylistSaga() {
    yield takeLatest(followStylist.TRIGGER, followStylistSaga);
}
