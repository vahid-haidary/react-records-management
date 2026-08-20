import { useQuery } from "@tanstack/react-query";
import { RecordsApi } from "../api/records.api";
import {
  adaptRecordsResponse,
  adaptFiltersResponse,
} from "../api/adapter/records.adapter";
import { mergeRecords } from "../api/adapter/merge-records";
import { RecordsStorage } from "../api/storage/records.storage";

export const recordsQueryKey = ["records"] as const;

export function useRecords() {
  return useQuery({
    queryKey: recordsQueryKey,
    queryFn: async () => {
      const response = await RecordsApi.getAll();
      const apiRecords = adaptRecordsResponse(response);
      const overrides = RecordsStorage.getOverrides();

      return {
        records: mergeRecords(apiRecords, overrides),
        filters: adaptFiltersResponse(response),
      };
    },
  });
}
