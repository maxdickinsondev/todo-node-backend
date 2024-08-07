import { IPagination } from "./types";

export const pagination = (query: IPagination, count: string | number) => {
  const page = Number(query.page) || 1;
  const per_page = Number(query.per_page) || 20;
  const offset = (page - 1) * per_page;
  const total_count = Number(count) || 0;
  const last_page = Math.ceil(total_count / per_page);
  const next = page === last_page ? null : page + 1;
  return { page, per_page, next, offset, last_page, total_count };
};
