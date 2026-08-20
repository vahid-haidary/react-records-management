import { useState } from "react";

import { AppLayout } from "./app/layout/app-layout";
import { RecordsPage } from "./pages/records/RecordsPage";
import type { RecordFormSchema } from "./features/records/schemas/record-form.schema";
import { RecordFormModal } from "./features/records/components/record-modals/RecordFormModal";

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateRecord = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateSubmit = async (values: RecordFormSchema) => {
    console.log("Create record:", values);
  };

  return (
    <AppLayout onCreateRecord={handleCreateRecord}>
      <RecordsPage />

      <RecordFormModal
        open={isCreateModalOpen}
        mode="create"
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateSubmit}
      />
    </AppLayout>
  );
}

export default App;
