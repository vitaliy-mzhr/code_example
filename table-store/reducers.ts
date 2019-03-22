import { Sort } from '@ik/table';
import { Action } from '@ngrx/store';
import { dcopy } from '../../helpers/dcopy';
import { tableActionsFactory } from './actions';

export interface TableState<T> {
  data: T[];
  meta: any;
  page: number;
  loading: boolean;
  loaded: boolean;
  sort: Sort;
  filters: { [key: string]: any };
  error: null | any;
}

export function reducerFactory<T>(tableName) {
  const { actionTypes, actions } = tableActionsFactory(tableName);
  const initialState = {
    data: [],
    meta: {},
    loading: false,
    loaded: false,
    sort: null,
    page: 1,
    filters: {},
    error: null
  };
  const reducer = function(state: TableState<T>, action: any) {
    if (!state) {
      state = dcopy(initialState);
    }
    switch (action.type) {
      case actionTypes.loadData:
        return { ...state, loading: true };
      case actionTypes.loadDataSuccess:
        return {
          ...state,
          data: action.payload.data,
          meta: action.payload.meta,
          loading: false,
          loaded: true
        };
      case actionTypes.loadDataFail:
        return {
          ...state,
          loading: false,
          loaded: true
        };
      case actionTypes.changeSort:
        return {
          ...state,
          sort: action.payload
        };
      case actionTypes.changeFilters:
        return {
          ...state,
          page: 1,
          filters: action.payload
        };
      case actionTypes.changePage:
        return {
          ...state,
          page: action.payload
        };
      default:
        return state;
    }
  };

  return {
    actionTypes,
    actions,
    reducer
  };
}
