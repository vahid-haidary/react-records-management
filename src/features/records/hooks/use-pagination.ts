// hooks/use-pagination.ts
import { useState } from "react";

interface UsePaginationOptions {
  totalItems: number;
  initialPageSize?: number;
  resetKey?: string | number;
}

export function usePagination({
  totalItems,
  initialPageSize = 10,
  resetKey,
}: UsePaginationOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [prevResetKey, setPrevResetKey] = useState(resetKey);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (resetKey !== prevResetKey) {
    setPrevResetKey(resetKey);
    setCurrentPage(1);
  } else if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size);
    setCurrentPage(1);
  }

  function paginate<T>(items: T[]): T[] {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }

  return {
    currentPage,
    pageSize,
    totalPages,
    setCurrentPage,
    setPageSize: handlePageSizeChange,
    paginate,
  };
}
