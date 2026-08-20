import { useState } from "react";

interface UsePaginationOptions {
  totalItems: number;
  initialPageSize?: number;
}

export function usePagination({
  totalItems,
  initialPageSize = 10,
}: UsePaginationOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const [prevTotalPages, setPrevTotalPages] = useState(totalPages);
  if (totalPages !== prevTotalPages) {
    setPrevTotalPages(totalPages);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
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
