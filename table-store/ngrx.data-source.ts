import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { IkSort } from '@ik/table';
import { select, Store } from '@ngrx/store';
import { Observable, ReplaySubject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ITableActions } from './actions';
import { ITableSelectors } from './selectors';

export interface TableEmptyState {
  isEmpty(): Observable<boolean>;
}

export interface TableFiltersDataSource {
  setFilters(filters: { [key: string]: any }): void;
}

export interface PaginationDataSource {
  setPage(page: number): void;
  getMeta(): Observable<any>;
  getPage(): Observable<any>;
}

export class NgrxDataSource<T>
  implements
    DataSource<T>,
    TableEmptyState,
    TableFiltersDataSource,
    PaginationDataSource {
  public data = [];
  private sort: IkSort;
  private destroy$ = new ReplaySubject(1);

  constructor(
    public actions: ITableActions,
    public selectors: ITableSelectors<T>,
    public store: Store<any>
  ) {}

  public connect(
    collectionViewer: CollectionViewer
  ): Observable<T[] | ReadonlyArray<T>> {
    this.reload();
    return this.getData();
  }

  public getData(): Observable<T[]> {
    return this.store.pipe(
      select(this.selectors.selectData),
      tap(data => {
        this.data = data;
      })
    );
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public registerSort(sort: IkSort) {
    if (!sort) {
      throw new Error('Sort is undefined');
    }
    this.sort = sort;
    this.store.dispatch(
      new this.actions.ChangeSort({
        active: sort.active,
        direction: sort.direction
      })
    );
    sort.sortChange.pipe(takeUntil(this.destroy$)).subscribe(newSort => {
      this.store.dispatch(new this.actions.ChangeSort(newSort));
    });
  }

  public setPage(page: number) {
    this.store.dispatch(new this.actions.ChangePage(page));
  }

  public setFilters(filters: { [key: string]: any }) {
    this.store.dispatch(new this.actions.ChangeFilters(filters));
  }

  public isEmpty(): Observable<boolean> {
    return this.store.pipe(select(this.selectors.selectEmpty));
  }

  public getMeta(): Observable<any> {
    return this.store.pipe(select(this.selectors.selectMeta));
  }

  public getPage(): Observable<any> {
    return this.store.pipe(select(this.selectors.selectPage));
  }

  public reload() {
    this.store.dispatch(new this.actions.LoadData());
  }
}
