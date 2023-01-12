export interface Pagination {
  page: number;
  pageSize: number;
  sort: Sort | null;
  search: string;
}

export interface Sort {
  field: string;
  order: SortOrder;
}

export enum SortOrder {
  ascending = 'ascending',
  descending = 'descending',
}
