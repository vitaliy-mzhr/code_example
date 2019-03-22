import { AppContact, AppContactAction } from '../../Contact/interfaces';

export interface AppHomeAction {
  type: string;
  payload?: any;
}

export interface AppHomeState {
  isLoading: boolean;
  error: null | string;
  contacts: AppContact[];
}

export interface AppHomeProps {
  isLoading: boolean;
  contacts: AppContact[];
  error?: null | string;
}

export interface AppHomeDispatch {
  fetchContacts: () => AppHomeAction;
  toggleContact: (id: number) => AppContactAction;
  deleteContact: (id: number) => AppContactAction;
}
