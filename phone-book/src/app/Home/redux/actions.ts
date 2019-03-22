import * as types from './types';
import { AppHomeAction } from '../interfaces';

export const fetchContacts = (): AppHomeAction => ({
  type: types.FETCH_CONTACTS_REQUEST
});
