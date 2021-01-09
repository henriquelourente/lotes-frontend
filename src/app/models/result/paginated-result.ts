export interface PaginatedResult<T> {
  statusCode: number;
  content: PaginatedContent<T>;
}

export interface PaginatedContent<T> {
  currentPage: number;
  perPage: number;
  total: number;
  data: T[];
}