import { useMemo, useState } from "react";
import type { RecordModel } from "@/features/records/api/model/record.model";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";

export function useRecordsFilters(records: RecordModel[]) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const debouncedSearch = useDebouncedValue(search, 300);

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
    hasActiveFilters: Boolean(search || status),
  };
}
