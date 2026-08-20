import type {
  RecordApiFilter,
  RecordsApiResponse,
} from "../type/records.types";

export interface FilterOptionModel {
  key: string;
  label: string;
}

export interface FilterModel {
  key: string;
  label: string;
  type: "text" | "select";
  multiple: boolean;
  options: FilterOptionModel[];
}

function adaptFilter(filter: RecordApiFilter): FilterModel {
  return {
    key: filter.key,
    label: filter.label,
    type: filter.type,
    multiple: filter.multiple,
    options: filter.options.map((option) => ({
      key: option.key,
      label: option.value,
    })),
  };
}

export function adaptFiltersResponse(
  response: RecordsApiResponse,
): FilterModel[] {
  return response.filters.map(adaptFilter);
}
