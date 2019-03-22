import { all, takeLatest } from 'redux-saga/effects';
import { FETCH_CONTACTS_REQUEST } from '../app/Home/redux/types';
import { fetchContacts } from '../app/Home/redux/saga';

function* rootSaga() {
  yield all([
    yield takeLatest(FETCH_CONTACTS_REQUEST, fetchContacts),
  ]);
}

export default rootSaga;
