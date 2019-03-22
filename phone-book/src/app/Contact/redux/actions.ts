import * as types from './types';
import { AppContactAction } from '../interfaces';

export const toggleContact = (id: number): AppContactAction => ({
  type: types.TOGGLE_CONTACT_PHONES,
  payload: id,
});

export const deleteContact = (id: number): AppContactAction => ({
  type: types.DELETE_CONTACT,
  payload: id,
});

export const addContact = (contact: object): AppContactAction => ({
  type: types.ADD_CONTACT,
  payload: contact,
});

export const updateContact = (contact: object, id: number): AppContactAction => ({
  type: types.UPDATE_CONTACT,
  payload: {
    id,
    contact,
  }
});