import { AppHomeState } from '../../interfaces';
import homeReducer from '../reducer';
import * as homeTypes from '../types';
import * as contactTypes from '../../../Contact/redux/types';
import { AppContact } from '../../../Contact/interfaces';

const initialState: AppHomeState = {
  isLoading: false,
  error: null,
  contacts: [],
};

const mockContacts: AppContact[] = [{
  id: 1,
  name: {
    first: 'man',
    last: 'awesome',
  },
  phone: [],
  expanded: false,
}];

const stateWithContacts: AppHomeState = {
  isLoading: false,
  error: null,
  contacts: [
    {
      id: 1,
      name: {
        first: 'man',
        last: 'awesome',
      },
      phone: [],
      expanded: false,
    }
  ]
};

describe('Home reducer test', () => {
  it('should return initial state', () => {
    // @ts-ignore
    expect(homeReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_CONTACTS_REQUEST', () => {
    expect(homeReducer(initialState, {type: homeTypes.FETCH_CONTACTS_REQUEST})).toEqual({
      isLoading: true,
      error: null,
      contacts: [],
    });
  });

  it('should handle FETCH_CONTACTS_SUCCESS', () => {
    expect(homeReducer(initialState, {
      type: homeTypes.FETCH_CONTACTS_SUCCESS,
      payload: mockContacts,
    })).toEqual({
      ...initialState,
      contacts: mockContacts,
    });
  });

  it('should handle FETCH_CONTACTS_FAILURE', () => {
    expect(homeReducer(initialState, {
      type: homeTypes.FETCH_CONTACTS_FAILURE,
      payload: 'error',
    })).toEqual({
      ...initialState,
      error: 'error',
    });
  });

  it('should handle TOGGLE_CONTACT_PHONES', () => {
    expect(homeReducer(stateWithContacts, {
      type: contactTypes.TOGGLE_CONTACT_PHONES,
      payload: 1,
    })).toEqual({
      ...stateWithContacts,
      contacts: [
        {
          ...mockContacts[0],
          expanded: true,
        }
      ],
    });
  });

  it('should handle DELETE_CONTACT', () => {
    expect(homeReducer(stateWithContacts, {
      type: contactTypes.DELETE_CONTACT,
      payload: 1,
    })).toEqual({
      ...stateWithContacts,
      contacts: [],
    });
  });

  it('should handle ADD_CONTACT', () => {
    expect(homeReducer(initialState, {
      type: contactTypes.ADD_CONTACT,
      payload: {
        firstName: 'man',
        lastName: 'awesome1',
        phones: ['+380504784261']
      },
    })).toEqual({
      ...initialState,
      contacts: [
        {
          id: 1,
          name: {
            first: 'man',
            last: 'awesome1',
          },
          phone: ['+380504784261'],
          expanded: false,

        }
      ]
    });
  });

  it('should handle UPDATE_CONTACT', () => {
    expect(homeReducer(stateWithContacts, {
      type: contactTypes.UPDATE_CONTACT,
      payload: {
        id: 1,
        contact: {
          firstName: 'man',
          lastName: 'awesome1',
          phones: ['+380504784262']
        }
      },
    })).toEqual({
      ...stateWithContacts,
      contacts: [
        {
          id: 1,
          name: {
            first: 'man',
            last: 'awesome1',
          },
          phone: ['+380504784262'],
          expanded: true,

        }
      ]
    });
  });

});
