import { put, call, all, takeLatest } from 'redux-saga/effects';

// Actions
import { getUserCollectionsDetails } from '../../actions';
// Utils
import { getUserCollectionsDetailsEntries } from '../../utils/api';



export function* getUserCollectionsDetailsSaga({ payload = [] }) {
    try {
        yield put(getUserCollectionsDetails.request());

        const requests = payload.map(({ category_slug, category_type }) =>
            call(getUserCollectionsDetailsEntries, { category_type, category_slug })
        );
        const data = yield all(requests);

        const newUserCollections = payload.map((values, index) => {
            return {
                ...values,
                collections: data[index]
            };
        });

        yield put(getUserCollectionsDetails.success(newUserCollections));
    } catch (e) {
        yield put(getUserCollectionsDetails.failure(e));
    }
}

export default function* handleSaga() {
    yield takeLatest(getUserCollectionsDetails.TRIGGER, getUserCollectionsDetailsSaga);
}
