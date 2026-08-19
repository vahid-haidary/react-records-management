import { axiosClient } from "@/shared/api/api-client";
import type { RecordsResponse } from "../types/record.types";
import { ENDPOINTS } from "@/shared/api/api-endpoints";

export const RecordsApi = {
  getAll: async (): Promise<RecordsResponse> => {
    const { data } = await axiosClient.get<RecordsResponse>(
      ENDPOINTS.records.getAll,
    );

    return data;
  },
};
