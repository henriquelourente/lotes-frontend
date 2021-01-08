export interface PaginatedResult<T> {
  currentPage: number;
  perPage: number;
  total: number;
  data: T[];
}