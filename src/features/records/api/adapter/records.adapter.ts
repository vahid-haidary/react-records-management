import type { RecordModel } from "../model/record.model";
import type { RecordApiItem, RecordsApiResponse } from "../type/records.types";

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
