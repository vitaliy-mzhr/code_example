import { AppHomeState } from '../app/Home/interfaces';
import { AppNavState } from '../app/Nav/interfaces';

export interface AppState {
  contactsState: AppHomeState;
  searchState: AppNavState;
}
