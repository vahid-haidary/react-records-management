import { ENDPOINTS } from "@/shared/api/api-endpoints";
import { axiosClient } from "@/shared/api/api-client";

import type { RecordsApiResponse } from "./type/records.types";

export const RecordsApi = {
  getAll: async (): Promise<RecordsApiResponse> => {
    const { data } = await axiosClient.get<RecordsApiResponse>(
      ENDPOINTS.records.getAll,
    );

    return data;
  },
};
