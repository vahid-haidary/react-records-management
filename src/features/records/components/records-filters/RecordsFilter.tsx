import { CiSearch, CiTrash } from "react-icons/ci";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import type { FilterOptionModel } from "@/features/records/api/adapter/filters.adapter";

interface RecordsFiltersProps {
  search: string;
  status: string;
  statusOptions: FilterOptionModel[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClear: () => void;
}

export function RecordsFilters({
  search,
  status,
  statusOptions,
  onSearchChange,
  onStatusChange,
  onClear,
}: RecordsFiltersProps) {
  const hasActiveFilters = Boolean(search || status);

  return (
    <section className="mb-6 rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
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

        <div className="w-full lg:max-w-xs">
          <Select
            id="records-status"
            label="وضعیت"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            options={statusOptions.map((option) => ({
              value: option.key,
              label: option.label,
            }))}
            placeholder="همه وضعیت‌ ها"
          />
        </div>

        <Button
          type="button"
          variant="secondary"
          disabled={!hasActiveFilters}
          onClick={onClear}
          className="filter-clear-button"
        >
          <CiTrash size={19} />
          <span>حذف فیلترها</span>
        </Button>
      </div>
    </section>
  );
}
