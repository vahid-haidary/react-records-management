import type { PaginationProps } from "../../types/pagination.types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export function RecordsPagination({
  currentPage,
  totalPages,
  totalRecords,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="border-t border-border bg-surface p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* total records */}
        <div className="flex items-center justify-between text-sm text-text-muted sm:justify-start">
          <span>تعداد کل رکوردها</span>

          <span className="mr-2 font-semibold text-text">
            {totalRecords.toLocaleString("fa-IR")}
          </span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center justify-between gap-2 sm:justify-start">
            <label
              htmlFor="page-size"
              className="whitespace-nowrap text-sm text-text-muted"
            >
              نمایش در هر صفحه
            </label>

            <select
              id="page-size"
              value={pageSize}
              onChange={(event) => onPageSizeChange(Number(event.target.value))}
              className="h-9 rounded-lg border border-border bg-background px-2.5 text-sm text-text outline-none focus:border-primary"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option.toLocaleString("fa-IR")}
                </option>
              ))}
            </select>
          </div>

          {/* pagination */}
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <button
              type="button"
              disabled={isFirstPage}
              onClick={() => onPageChange(currentPage - 1)}
              aria-label="صفحه قبل"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>

            <span className="flex items-center gap-1 whitespace-nowrap text-sm text-text-muted">
              صفحه
              <span className="font-semibold text-text">
                {currentPage.toLocaleString("fa-IR")}
              </span>
              از
              <span className="font-semibold text-text">
                {totalPages.toLocaleString("fa-IR")}
              </span>
            </span>

            <button
              type="button"
              disabled={isLastPage}
              onClick={() => onPageChange(currentPage + 1)}
              aria-label="صفحه بعد"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
