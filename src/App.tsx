import { useState } from "react";
import { AppLayout } from "./app/layout/app-layout";
import { RecordsPage } from "./pages/records/RecordsPage";

function App() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  return (
    <AppLayout onCreateRecord={() => setCreateModalOpen(true)}>
      <RecordsPage
        isCreateModalOpen={isCreateModalOpen}
        onCloseCreateModal={() => setCreateModalOpen(false)}
      />
    </AppLayout>
  );
}

export default App;
