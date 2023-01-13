import { SortOrder } from 'mongoose';

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
