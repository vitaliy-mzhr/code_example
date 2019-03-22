import {  call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import * as types from '../types';
import * as actions from '../actions';
import * as sagas from '../saga';
import * as api from '../../../../api';
import { AppContact } from '../../../Contact/interfaces';

const mockContacts: AppContact[] = [{
  id: 1,
  name: {
    first: 'man',
    last: 'awesome',
  },
  phone: [],
  expanded: false,
}];

describe('Home saga test', () => {
  const action = actions.fetchContacts();
  // @ts-ignore
  const generator = cloneableGenerator(sagas.fetchContacts)(action);
  expect(generator.next().value).toEqual(call(api.fetchData));
  it('fetch success', () => {
    const clone = generator.clone();
    const payload = {
      data: mockContacts,
    };
    expect(clone.next(payload).value).toEqual(put({
      type: types.FETCH_CONTACTS_SUCCESS,
      payload: payload.data,
    }));
    expect(clone.next().done).toEqual(true);
  });

  it('fetch failure', () => {
    const clone = generator.clone();
    const fetchedErrors = {
      message: 'Fetch failed',
    };
    // @ts-ignore
    expect(clone.throw({
      error: fetchedErrors,
    }).value).toEqual(put({
      type: types.FETCH_CONTACTS_FAILURE,
      payload: {
        error: fetchedErrors,
      },
    }));
    expect(clone.next().done).toEqual(true);
  });

});