import {
  Action,
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import { MemoizedSelectorWithProps } from '@ngrx/store/src/selector';
import { TableState } from './reducers';

export interface ITableSelectors<T> {
  tableSelector: MemoizedSelectorWithProps<TableState<T>, {}, any>;
  selectData: MemoizedSelectorWithProps<TableState<T>, {}, any>;
  selectEmpty: MemoizedSelectorWithProps<TableState<T>, {}, any>;
  selectMeta: MemoizedSelectorWithProps<TableState<T>, {}, any>;
  selectLoading: MemoizedSelectorWithProps<TableState<T>, {}, any>;
  selectPage: MemoizedSelectorWithProps<TableState<T>, {}, any>;
  selectFilters: MemoizedSelectorWithProps<TableState<T>, {}, any>;
  selectSort: MemoizedSelectorWithProps<TableState<T>, {}, any>;
}

export function selectorsFactory<T>(feature, tableName) {
  const featureState: MemoizedSelector<
    object,
    TableState<T>
  > = createFeatureSelector<any>(feature);
  const tableState = createSelector(
    featureState,
    (state: any): TableState<T> => {
      return (state && state[tableName]) || {};
    }
  );
  const selectData = createSelector(tableState, (state: TableState<T>) => {
    return state.data || [];
  });
  const selectLoading = createSelector(tableState, (state: TableState<T>) => {
    return state.loading;
  });
  const selectEmpty = createSelector(tableState, (state: TableState<T>) => {
    return state.loaded && state.data && state.data.length === 0;
  });
  const selectMeta = createSelector(tableState, (state: TableState<T>) => {
    return state.meta;
  });
  const selectPage = createSelector(tableState, (state: TableState<T>) => {
    return state.page;
  });
  const selectFilters = createSelector(tableState, (state: TableState<T>) => {
    return state.filters;
  });
  const selectSort = createSelector(tableState, (state: TableState<T>) => {
    if (state.sort && state.sort.direction) {
      if (state.sort.direction === 'asc') {
        return state.sort.active;
      }
      return `-${state.sort.active}`;
    }
    return undefined;
  });

  return {
    tableSelector: tableState,
    selectData,
    selectEmpty,
    selectMeta,
    selectLoading,
    selectPage,
    selectFilters,
    selectSort
  };
}
