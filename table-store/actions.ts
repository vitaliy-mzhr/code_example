import { Sort } from '@ik/table';
import { Action } from '@ngrx/store';

interface TableAction extends Action {
  payload: any;
}

export interface ITableActions {
  LoadData: any;
  LoadDataSuccess: any;
  LoadDataFailed: any;
  ChangeSort: any;
  ChangePage: any;
  ChangeFilters: any;
}

export function tableActionsFactory(tableName) {
  const prefix = `[Table ` + tableName + ']';
  const actionTypes = {
    loadData: `${prefix} Load Data`,
    loadDataSuccess: `${prefix} Load Data Success`,
    loadDataFail: `${prefix} Load Data Failed`,

    changeSort: `${prefix} Change Sort`,
    changePage: `${prefix} Change Port`,
    changeFilters: `${prefix} Change Filters`
  };

  class LoadData implements Action {
    readonly type = actionTypes.loadData;
    constructor(public payload = null) {}
  }

  class LoadDataSuccess implements Action {
    readonly type = actionTypes.loadDataSuccess;

    constructor(public payload: any) {}
  }

  class LoadDataFailed implements Action {
    readonly type = actionTypes.loadDataFail;

    constructor(public payload: any) {}
  }

  class ChangeSort implements Action {
    readonly type = actionTypes.changeSort;

    constructor(public payload: Sort) {}
  }

  class ChangePage implements Action {
    readonly type = actionTypes.changePage;

    constructor(public payload: number) {}
  }

  class ChangeFilters implements Action {
    readonly type = actionTypes.changeFilters;

    constructor(public payload: any) {}
  }

  return {
    actionTypes,
    actions: {
      LoadData,
      LoadDataSuccess,
      LoadDataFailed,
      ChangeSort,
      ChangePage,
      ChangeFilters
    }
  };
}
