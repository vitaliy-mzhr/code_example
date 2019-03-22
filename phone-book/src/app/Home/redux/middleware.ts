import { AppHomeAction } from '../interfaces';
import { FETCH_CONTACTS_SUCCESS } from './types';
import { AppContact } from '../../Contact/interfaces';

export const addExpandedProps = () => (next: any) => (action: AppHomeAction) => {
  if (action.type === FETCH_CONTACTS_SUCCESS && action.payload) {
    const updatedAction: AppHomeAction = {
      ...action,
      payload: action.payload.map((contact: AppContact) => ({
        ...contact,
        expanded: false,
      })),
    };
    next(updatedAction);
  } else {
    next(action);
  }

};
