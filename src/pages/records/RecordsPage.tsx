import { RecordsFilters } from "@/features/records/components/records-filters";
import { RecordsPageHeader } from "@/features/records/components/records-page-header";
import { RecordsPagination } from "@/features/records/components/records-pagination";
import { RecordsTable } from "@/features/records/components/records-table";
import type { RecordModel } from "@/features/records/api/model/record.model";
import { useRecords } from "@/features/records/hooks/use-records";
import { useMemo } from "react";
import { usePagination } from "@/features/records/hooks/use-pagination";

interface RecordsPageProps {
  onDelete: (record: RecordModel) => void;
}

export function RecordsPage({ onDelete }: RecordsPageProps) {
  const { data: records = [], isLoading, isError, refetch } = useRecords();

  const {
    currentPage,
    pageSize,
    totalPages,
    setCurrentPage,
    setPageSize,
    paginate,
  } = usePagination({ totalItems: records.length });

  const paginatedRecords = useMemo(
    () => paginate(records),
    [records, currentPage, pageSize],
  );

  const handleEdit = (record: RecordModel) => {
    console.log("Edit:", record);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <RecordsPageHeader totalRecords={records.length} />

      <RecordsFilters
        search=""
        status=""
        onSearchChange={() => {}}
        onStatusChange={() => {}}
        onClear={() => {}}
      />

      {isLoading ? (
        <div className="rounded-xl border border-border bg-surface p-8 text-center text-sm text-text-muted">
          در حال دریافت اطلاعات...
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-danger/20 bg-danger/5 p-8 text-center">
          <p className="mb-4 text-sm text-danger">
            دریافت اطلاعات با خطا مواجه شد.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white"
          >
            تلاش مجدد
          </button>
        </div>
      ) : (
        <>
          <RecordsTable
            records={paginatedRecords}
            onEdit={handleEdit}
            onDelete={onDelete}
          />

          <RecordsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={records.length}
            pageSize={pageSize}
            pageSizeOptions={[5, 10, 20]}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}
    </main>
  );
}
