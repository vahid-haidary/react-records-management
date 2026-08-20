import type { RecordModel } from "../model/record.model";
import type {
  RecordApiItem,
  RecordApiFilter,
  RecordsApiResponse,
} from "../type/records.types";

function adaptRecord(item: RecordApiItem): RecordModel {
  return {
    id: item.id,
    title: item.title,
    description: item.description,

    status: {
      key: item.status.key as RecordModel["status"]["key"],
      label: item.status.value,
    },

    image: {
      url: item.image.url,
      alt: item.image.alt,
    },

    createdAt: item.created_at,
    updatedAt: item.updated_at,
  };
}

export function adaptRecordsResponse(
  response: RecordsApiResponse,
): RecordModel[] {
  return response.data.map(adaptRecord);
}

export interface FilterOptionModel {
  key: string;
  label: string;
}

export interface FilterModel {
  key: string;
  label: string;
  type: RecordApiFilter["type"];
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
