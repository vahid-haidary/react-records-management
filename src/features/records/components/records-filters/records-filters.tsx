import { CiSearch, CiTrash } from "react-icons/ci";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";

interface RecordsFiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClear: () => void;
}

const statusOptions = [
  { value: "active", label: "فعال" },
  { value: "inactive", label: "غیرفعال" },
  { value: "pending", label: "در انتظار" },
];

export function RecordsFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onClear,
}: RecordsFiltersProps) {
  const hasActiveFilters = Boolean(search || status);

  return (
    <section className="mb-6 rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        {/* Search */}
        <div className="flex-1">
          <Input
            id="records-search"
            type="search"
            label="جستجو"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="جستجو..."
            endIcon={<CiSearch size={22} />}
          />
        </div>

        {/* Status */}
        <div className="w-full lg:max-w-xs">
          <Select
            id="records-status"
            label="وضعیت"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            options={statusOptions}
            placeholder="همه وضعیت‌ ها"
          />
        </div>

        {/* Clear */}
        <Button
          type="button"
          variant="secondary"
          disabled={!hasActiveFilters}
          onClick={onClear}
          className="h-11 shrink-0"
        >
          <CiTrash size={20} />
          <span>پاک کردن فیلترها</span>
        </Button>
      </div>
    </section>
  );
}
