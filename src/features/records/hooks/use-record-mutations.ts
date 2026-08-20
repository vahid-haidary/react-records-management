import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { recordsQueryKey, type RecordsQueryData } from "./use-records";
import { RecordsStorage } from "../api/storage/records.storage";
import type { RecordModel } from "../api/model/record.model";
import type { RecordFormSchema } from "../schemas/record-form.schema";

export function useRecordMutations() {
  const queryClient = useQueryClient();

  function updateRecordsCache(
    updater: (records: RecordModel[]) => RecordModel[],
  ) {
    queryClient.setQueryData<RecordsQueryData>(recordsQueryKey, (old) => {
      if (!old) return old;
      return { ...old, records: updater(old.records) };
    });
  }

  function createRecord(values: RecordFormSchema, statusLabel: string) {
    try {
      const now = new Date().toISOString();

      const record: RecordModel = {
        id: RecordsStorage.generateId(),
        title: values.title.trim(),
        description: values.description?.trim() ?? "",
        status: {
          key: values.status as RecordModel["status"]["key"],
          label: statusLabel,
        },
        image: {
          url: values.imageUrl ?? "",
          alt: values.imageAlt ?? "",
        },
        createdAt: now,
        updatedAt: now,
      };

      RecordsStorage.addCreated(record);

      updateRecordsCache((records) => [record, ...records]);

      toast.success("رکورد با موفقیت ایجاد شد");
    } catch {
      toast.error("ایجاد رکورد با خطا مواجه شد");
    }
  }

  function editRecord(
    id: number,
    values: RecordFormSchema,
    statusLabel: string,
  ) {
    try {
      const patch = {
        title: values.title.trim(),
        description: values.description?.trim() ?? "",
        status: {
          key: values.status as RecordModel["status"]["key"],
          label: statusLabel,
        },
        image: {
          url: values.imageUrl ?? "",
          alt: values.imageAlt ?? "",
        },
        updatedAt: new Date().toISOString(),
      };

      RecordsStorage.addEdited(id, patch);

      updateRecordsCache((records) =>
        records.map((record) =>
          record.id === id ? { ...record, ...patch } : record,
        ),
      );

      toast.success("رکورد با موفقیت ویرایش شد");
    } catch {
      toast.error("ویرایش رکورد با خطا مواجه شد");
    }
  }

  function deleteRecord(id: number) {
    try {
      RecordsStorage.addDeleted(id);

      updateRecordsCache((records) =>
        records.filter((record) => record.id !== id),
      );

      toast.success("رکورد با موفقیت حذف شد");
    } catch {
      toast.error("حذف رکورد با خطا مواجه شد");
    }
  }

  return {
    createRecord,
    editRecord,
    deleteRecord,
  };
}
