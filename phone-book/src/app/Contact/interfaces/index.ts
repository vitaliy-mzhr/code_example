import { AppHomeAction } from '../../Home/interfaces';

export interface AppContact {
  id: number;
  name: {
    first: string;
    last: string;
  };
  phone: string[];
  expanded: boolean;
  divider?: string;
}

export interface AppContactDivider {
  divider: string;
}

export interface AppContactAction {
  type: string;
  payload?: any;
}

export interface AppEditContactDispatch {
  fetchContacts: () => AppHomeAction;
  updateContact: (contact: object, id: number) => AppContactAction;
}