import { useState } from "react";

import { AppLayout } from "./app/layout/app-layout";
import { RecordsPage } from "./pages/records/RecordsPage";

import { ConfirmDialog } from "./shared/ui/confirm-dialog";

import type { RecordFormSchema } from "./features/records/schemas/record-form.schema";
import type { RecordItem } from "./features/records/types/record.types";
import { RecordFormModal } from "./features/records/components/record-modals/RecordFormModal";

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [recordToDelete, setRecordToDelete] = useState<RecordItem | null>(null);

  const handleCreateRecord = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateSubmit = async (values: RecordFormSchema) => {
    console.log("Create record:", values);
  };

  const handleDeleteRecord = (record: RecordItem) => {
    setRecordToDelete(record);
  };

  const handleCancelDelete = () => {
    setRecordToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!recordToDelete) return;

    console.log("Delete record:", recordToDelete);

    setRecordToDelete(null);
  };

  return (
    <AppLayout onCreateRecord={handleCreateRecord}>
      <RecordsPage onDelete={handleDeleteRecord} />

      <RecordFormModal
        open={isCreateModalOpen}
        mode="create"
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateSubmit}
      />

      <ConfirmDialog
        open={recordToDelete !== null}
        title="حذف رکورد"
        description={
          recordToDelete
            ? `آیا از حذف رکورد «${recordToDelete.title}» مطمئن هستید؟`
            : ""
        }
        confirmText="حذف رکورد"
        cancelText="انصراف"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </AppLayout>
  );
}

export default App;
