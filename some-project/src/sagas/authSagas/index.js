import { all, fork } from 'redux-saga/effects';

import handleLoginSaga from './loginSaga';
import handleSignUpSaga from './signUpSaga';
import handleLogoutSaga from './logoutSaga';



export default function* authSagas() {
    yield all([
        fork(handleLoginSaga),
        fork(handleSignUpSaga),
        fork(handleLogoutSaga)
    ]);
}
