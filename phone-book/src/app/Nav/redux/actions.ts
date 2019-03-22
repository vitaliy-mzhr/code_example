import { AppNavAction } from '../interfaces';
import { INPUT_CLEARED, INPUT_CHANGED } from './types';

export const onSearchChange = (input: string): AppNavAction => ({
  type: INPUT_CHANGED,
  payload: input,
});

export const clearSearchInput = (): AppNavAction => ({
  type: INPUT_CLEARED,
});
