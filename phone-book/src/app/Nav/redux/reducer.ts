import { AppNavAction, AppNavState } from '../interfaces';
import * as types from './types';

const INITIAL_STATE: AppNavState = {
  inputValue: '',
};

export default function homeReducer(state: AppNavState = INITIAL_STATE, action: AppNavAction) {
  switch (action.type) {
    case types.INPUT_CHANGED: {
      return {
        ...state,
        inputValue: action.payload,
      };
    }
    case types.INPUT_CLEARED: {
      return {
        ...state,
        inputValue: '',
      };
    }
    default: {
      return state;
    }
  }
}