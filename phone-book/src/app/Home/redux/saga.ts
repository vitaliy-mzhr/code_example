import { call, put } from 'redux-saga/effects';
import { fetchData } from '../../../api';
import * as types from './types';

export function* fetchContacts() {
  try {
    const response: any = yield call(fetchData);
    yield put({
      type: types.FETCH_CONTACTS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    yield put({
      type: types.FETCH_CONTACTS_FAILURE,
      payload: error,
    });
  }
}