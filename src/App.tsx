import { useRecords } from "./features/records/hooks/use-records";

function App() {
  const { data, isLoading, isError, error } = useRecords();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;
