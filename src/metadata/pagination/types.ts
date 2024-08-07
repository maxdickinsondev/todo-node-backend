export interface IPagination {
  page?: number;
  per_page?: number;
  next?: null | number;
  last_page?: number;
  total_count?: number;
}
