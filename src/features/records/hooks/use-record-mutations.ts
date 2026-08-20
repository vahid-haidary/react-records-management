import { useQueryClient } from "@tanstack/react-query";
import { recordsQueryKey } from "./use-records";
import { RecordsStorage } from "../api/storage/records.storage";
import type { RecordModel } from "../api/model/record.model";
import type { RecordFormValuesSchema } from "../schemas/record-form.schema";

export function useRecordMutations() {
  const queryClient = useQueryClient();

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: recordsQueryKey });
  }

  function createRecord(values: RecordFormValuesSchema, statusLabel: string) {
    const now = new Date().toISOString();

    const record: RecordModel = {
      id: RecordsStorage.generateId(),
      title: values.title.trim(),
      description: values.description?.trim() ?? "",
      status: {
        key: values.status as RecordModel["status"]["key"],
        label: statusLabel,
      },
      image: { url: values.imageUrl ?? "", alt: values.imageAlt ?? "" },
      createdAt: now,
      updatedAt: now,
    };

    RecordsStorage.addCreated(record);
    invalidate();
  }

  function editRecord(
    id: number,
    values: RecordFormValuesSchema,
    statusLabel: string,
  ) {
    RecordsStorage.addEdited(id, {
      title: values.title.trim(),
      description: values.description?.trim() ?? "",
      status: {
        key: values.status as RecordModel["status"]["key"],
        label: statusLabel,
      },
      image: { url: values.imageUrl ?? "", alt: values.imageAlt ?? "" },
      updatedAt: new Date().toISOString(),
    });
    invalidate();
  }

  function deleteRecord(id: number) {
    RecordsStorage.addDeleted(id);
    invalidate();
  }

  return { createRecord, editRecord, deleteRecord };
}
