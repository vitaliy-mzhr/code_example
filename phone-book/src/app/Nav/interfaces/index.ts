import { AppContact, AppContactAction } from '../../Contact/interfaces';
import { AppHomeAction } from '../../Home/interfaces';

export interface AppNavState {
  inputValue: string;
}

export interface AppSearchProps {
  isLoading: boolean;
  error?: null | string;
  contacts: AppContact[];
  searchInput: string;
}

export interface AppNavProps {
  inputValue: string;
}

export interface AppNavAction {
  type: string;
  payload?: string;
}

export interface AppNavDispatch {
  onSearchChange: (input: string) => AppNavAction;
  clearSearchInput: () => AppNavAction;
  fetchContacts: () => AppHomeAction;
}

export interface AppSearchDispatch {
  toggleContact: (id: number) => AppContactAction;
  deleteContact: (id: number) => AppContactAction;
}