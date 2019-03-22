import * as actions from '../actions';
import * as types from '../types';

describe('Home actions', () => {
  it('fetchContacts should create correct action', () => {
    expect(actions.fetchContacts()).toEqual({
      type: types.FETCH_CONTACTS_REQUEST,
    });
  });
});
