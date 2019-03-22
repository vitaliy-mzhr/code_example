import { all, fork } from 'redux-saga/effects';

import handleGetUserSaga from './getUserSaga';
import handleUpdateUserSaga from './updateUserSaga';
import handleUpdateUserEmailSaga from './updateUserEmailSaga';
import handleUpdateUserPasswordSaga from './updateUserPasswordSaga';
import handleUpdateUserAvatarSaga from './updateUserAvatarSaga';



export default function* userSagas() {
    yield all([
        fork(handleGetUserSaga),
        fork(handleUpdateUserSaga),
        fork(handleUpdateUserEmailSaga),
        fork(handleUpdateUserPasswordSaga),
        fork(handleUpdateUserAvatarSaga)
    ]);
}
