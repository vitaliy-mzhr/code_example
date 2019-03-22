import { put, call, takeLatest, all } from 'redux-saga/effects';

import { getOutfitPoint } from '../../actions';
import { getOutfitPointData } from '../../utils/api';



export function* getOutfitPointSaga({payload}) {
    try {
        const {points} = payload;

        if (Array.isArray(points)) {
            yield put(getOutfitPoint.request());

            const pointItems = yield call(getOutfitPointData, points[0].id);
            yield put(getOutfitPoint.success({
                isNew: true,
                data: [{items: pointItems}]
            }));

            if (points.length > 1) {
                const requests = [];

                for (let i = 1, l = points.length; i < l; i++) {
                    requests.push(call(getOutfitPointData, points[i].id));
                }
                const restPointItems = yield all(requests);

                yield put(getOutfitPoint.success({
                    data: [
                        {items: pointItems},
                        ...restPointItems.map((val, index) => ({
                            ...points[index + 1],
                            items: val
                        }))
                    ]
                }));
            }
        }

    } catch (e) {
        yield put(getOutfitPoint.failure(e));
    }
}

export default function* handleGetOutfitPoint() {
    yield takeLatest(getOutfitPoint.TRIGGER, getOutfitPointSaga);
}
