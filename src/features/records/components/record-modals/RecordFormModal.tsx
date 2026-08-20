import { Modal } from "@/shared/ui/modal";

import type { RecordModel } from "@/features/records/api/model/record.model";
import type { RecordFormSchema } from "../../schemas/record-form.schema";
import { RecordForm } from "./RecordForm";

interface StatusOption {
  key: string;
  label: string;
}

interface RecordFormModalProps {
  open: boolean;
  record: RecordModel | null;
  onClose: () => void;
  onSubmit: (
    values: RecordFormSchema,
    statusLabel: string,
  ) => void | Promise<void>;
  isSubmitting?: boolean;
  statusOptions: StatusOption[];
}

export function RecordFormModal({
  open,
  record,
  onClose,
  onSubmit,
  isSubmitting = false,
  statusOptions,
}: RecordFormModalProps) {
  const mode = record ? "edit" : "create";

  const title = mode === "create" ? "ایجاد رکورد جدید" : "ویرایش رکورد";

  const initialValues: Partial<RecordFormSchema> | undefined = record
    ? {
        title: record.title,
        description: record.description ?? undefined,
        status: record.status.key,
        imageUrl: record.image.url ?? undefined,
        imageAlt: record.image.alt ?? undefined,
      }
    : undefined;

  function handleSubmit(values: RecordFormSchema) {
    const selectedStatus = statusOptions.find(
      (option) => option.key === values.status,
    );

    const statusLabel = selectedStatus?.label ?? values.status;

    return onSubmit(values, statusLabel);
  }

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <RecordForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
        initialValues={initialValues}
        statusOptions={statusOptions}
      />
    </Modal>
  );
}
