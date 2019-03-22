import { AppHomeAction, AppHomeState } from '../interfaces';
import * as homeTypes from './types';
import * as contactTypes from '../../Contact/redux/types';
import { AppContact, AppContactAction } from '../../Contact/interfaces';

const INITIAL_STATE: AppHomeState = {
  isLoading: false,
  error: null,
  contacts: [],
};

export default function homeReducer(state: AppHomeState = INITIAL_STATE, action: AppContactAction & AppHomeAction) {
  switch (action.type) {
    case homeTypes.FETCH_CONTACTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case homeTypes.FETCH_CONTACTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        contacts: action.payload,
      };
    }
    case homeTypes.FETCH_CONTACTS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case contactTypes.TOGGLE_CONTACT_PHONES: {
      return {
        ...state,
        contacts: state.contacts.map((contact: AppContact) => {
          contact.expanded = (contact.id === action.payload) ? !contact.expanded : false;
          return contact;
        })
      };
    }
    case contactTypes.DELETE_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.filter((contact: AppContact) => contact.id !== action.payload)
      };
    }
    case contactTypes.ADD_CONTACT: {
      return {
        ...state,
        contacts: [
          ...state.contacts,
          {
            id: state.contacts.length + 1,
            name: {
              first: action.payload.firstName,
              last: action.payload.lastName,
            },
            phone: action.payload.phones,
            expanded: false,
          }
        ]
      };
    }
    case contactTypes.UPDATE_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.map((contact: AppContact) => (contact.id === action.payload.id)
          ? {
            ...contact,
            name: {
              first: action.payload.contact.firstName,
              last: action.payload.contact.lastName,
            },
            phone: action.payload.contact.phones,
          } : contact),
      };
    }
    default: {
      return state;
    }
  }
}