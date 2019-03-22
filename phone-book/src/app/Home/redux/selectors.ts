import { createSelector } from 'reselect';
import { AppHomeState } from '../interfaces';
import { AppContact } from '../../Contact/interfaces';
import { compareNames, insertDividers } from '../../../helpers';

const getContacts = (state: AppHomeState) => state.contacts;

export const getSortedContacts = createSelector(getContacts, (c: AppContact[]) => c.sort(compareNames));

export const getSortedContactsWithDividers = createSelector(getSortedContacts, (c: AppContact[]) => {
  return insertDividers(c);
});
