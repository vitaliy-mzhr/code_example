import { put, call, takeEvery } from 'redux-saga/effects';

// Actions
import { updateUserAvatar } from '../../actions';
// Utils
import { updateUserAvatarEntries } from '../../utils/api';



export function* updateUserAvatarSaga({ payload }) {
    try {
        const { image, onSuccessFn } = payload;
        yield put(updateUserAvatar.request());
        const photo = yield call(updateUserAvatarEntries, { photo: image });

        yield put(updateUserAvatar.success(photo));

        yield call(onSuccessFn);
    } catch (e) {
        yield put(updateUserAvatar.failure(e));
    }
}

export default function* handleSaga() {
    yield takeEvery(updateUserAvatar.TRIGGER, updateUserAvatarSaga);
}
