import { useMemo, useState } from "react";
import type { RecordModel } from "@/features/records/api/model/record.model";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";
import { RECORD_SEARCH_DEBOUNCE_MS } from "../constants/records.constants";

export function useRecordsFilters(records: RecordModel[]) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const debouncedSearch = useDebouncedValue(search, RECORD_SEARCH_DEBOUNCE_MS);

  const filteredRecords = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch = normalizedSearch
        ? record.title.toLowerCase().includes(normalizedSearch) ||
          record.description.toLowerCase().includes(normalizedSearch)
        : true;

      const matchesStatus = status ? record.status.key === status : true;

      return matchesSearch && matchesStatus;
    });
  }, [records, debouncedSearch, status]);

  function clearFilters() {
    setSearch("");
    setStatus("");
  }

  return {
    search,
    setSearch,
    status,
    setStatus,
    filteredRecords,
    clearFilters,
  };
}
