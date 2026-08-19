import { AppLayout } from "./app/layout/app-layout";

function App() {
  const handleCreateRecord = () => {
    console.log("Create record");
  };

  return (
    <AppLayout onCreateRecord={handleCreateRecord}>
      <div className="mx-auto max-w-7xl px-4 py-8">محتویات صفحه</div>
    </AppLayout>
  );
}

export default App;
