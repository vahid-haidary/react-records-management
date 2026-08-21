import { Select } from "@/shared/ui/select";
import type { PaginationProps } from "../../types/pagination.types";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

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

            <div className="relative w-auto">
              <Select
                id="page-size"
                value={String(pageSize)}
                onChange={(event) =>
                  onPageSizeChange(Number(event.target.value))
                }
                options={pageSizeOptions.map((option) => ({
                  value: String(option),
                  label: option.toLocaleString("fa-IR"),
                }))}
                className="h-9 w-auto min-w-10 px-2.5 pl-7 text-center"
              />

              <ChevronDownIcon
                width={10}
                height={10}
                className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-text-muted"
              />
            </div>
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
