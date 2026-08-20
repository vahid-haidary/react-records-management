import { useQuery } from "@tanstack/react-query";

import { RecordsApi } from "../api/records.api";
import {
  adaptRecordsResponse,
  adaptFiltersResponse,
} from "../api/adapter/records.adapter";

export const recordsQueryKey = ["records"] as const;

export function useRecords() {
  return useQuery({
    queryKey: recordsQueryKey,
    queryFn: async () => {
      const response = await RecordsApi.getAll();

      return {
        records: adaptRecordsResponse(response),
        filters: adaptFiltersResponse(response),
      };
    },
  });
}
