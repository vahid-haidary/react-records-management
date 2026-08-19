import { AppLayout } from "./app/layout/app-layout";
import { RecordsPage } from "./pages/records/records-page";

function App() {
  const handleCreateRecord = () => {
    console.log("Create record");
  };

  return (
    <AppLayout onCreateRecord={handleCreateRecord}>
      <RecordsPage />
    </AppLayout>
  );
}

export default App;
