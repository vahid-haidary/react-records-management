import { useQuery } from "@tanstack/react-query";
import { RecordsApi } from "../api/records.api";

export const recordsQueryKey = ["records"] as const;

export function useRecords() {
  return useQuery({
    queryKey: recordsQueryKey,
    queryFn: RecordsApi.getAll,
  });
}
