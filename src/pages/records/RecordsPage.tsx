import { useMemo, useState } from "react";

import { RecordsFilters } from "@/features/records/components/records-filters";
import { RecordsPageHeader } from "@/features/records/components/records-page-header";
import { RecordsPagination } from "@/features/records/components/records-pagination";
import { RecordsTable } from "@/features/records/components/records-table";
import type { RecordModel } from "@/features/records/api/model/record.model";
import { useRecords } from "@/features/records/hooks/use-records";
import { usePagination } from "@/features/records/hooks/use-pagination";
import { useRecordsFilters } from "@/features/records/hooks/use-records-filters";
import { useRecordMutations } from "@/features/records/hooks/use-record-mutations";
import type { RecordFormSchema } from "@/features/records/schemas/record-form.schema";
import { RecordFormModal } from "@/features/records/components/record-modals/RecordFormModal";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { Button } from "@/shared/ui/button";

interface RecordsPageProps {
  isCreateModalOpen: boolean;
  onCloseCreateModal: () => void;
}

export function RecordsPage({
  isCreateModalOpen,
  onCloseCreateModal,
}: RecordsPageProps) {
  const { data, isLoading, isError, refetch } = useRecords();

  const records = data?.records ?? [];
  const filters = data?.filters ?? [];

  const statusFilter = filters.find((f) => f.key === "status");
  const statusOptions = statusFilter?.options ?? [];

  const {
    search,
    setSearch,
    status,
    setStatus,
    filteredRecords,
    clearFilters,
  } = useRecordsFilters(records);

  const {
    currentPage,
    pageSize,
    totalPages,
    setCurrentPage,
    setPageSize,
    paginate,
  } = usePagination({
    totalItems: filteredRecords.length,
    resetKey: `${search}|${status}`,
  });

  const paginatedRecords = useMemo(
    () => paginate(filteredRecords),
    [filteredRecords, currentPage, pageSize],
  );

  const { createRecord, editRecord, deleteRecord } = useRecordMutations();

  const [recordToEdit, setRecordToEdit] = useState<RecordModel | null>(null);

  const handleEdit = (record: RecordModel) => setRecordToEdit(record);

  const isFormModalOpen = isCreateModalOpen || Boolean(recordToEdit);

  function closeFormModal() {
    setRecordToEdit(null);
    onCloseCreateModal();
  }

  function handleFormSubmit(values: RecordFormSchema, statusLabel: string) {
    if (recordToEdit) {
      editRecord(recordToEdit.id, values, statusLabel);
    } else {
      createRecord(values, statusLabel);
    }
    closeFormModal();
  }

  const [recordToDelete, setRecordToDelete] = useState<RecordModel | null>(
    null,
  );

  const handleDeleteClick = (record: RecordModel) => setRecordToDelete(record);

  function confirmDelete() {
    if (recordToDelete) {
      deleteRecord(recordToDelete.id);
      setRecordToDelete(null);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <RecordsPageHeader totalRecords={records.length} />

      <RecordsFilters
        search={search}
        status={status}
        statusOptions={statusOptions}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onClear={clearFilters}
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
          <Button
            type="button"
            variant="danger"
            onClick={() => refetch()}
            className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white"
          >
            تلاش مجدد
          </Button>
        </div>
      ) : records.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-8 text-center text-sm text-text-muted">
          هنوز رکوردی ثبت نشده است.
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <p className="mb-4 text-sm text-text-muted">
            رکوردی مطابق فیلترهای انتخاب‌شده پیدا نشد.
          </p>
        </div>
      ) : (
        <>
          <RecordsTable
            records={paginatedRecords}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />

          <RecordsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={filteredRecords.length}
            pageSize={pageSize}
            pageSizeOptions={[5, 10, 20]}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}

      <RecordFormModal
        open={isFormModalOpen}
        onClose={closeFormModal}
        onSubmit={handleFormSubmit}
        record={recordToEdit}
        statusOptions={statusOptions}
      />

      <ConfirmDialog
        open={Boolean(recordToDelete)}
        title="حذف رکورد"
        description={
          recordToDelete
            ? `آیا از حذف رکورد «${recordToDelete.title}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`
            : ""
        }
        confirmText="حذف"
        cancelText="انصراف"
        onCancel={() => setRecordToDelete(null)}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
