import { Modal } from "@/shared/ui/modal";
import type { RecordFormSchema } from "../../schemas/record-form.schema";
import { RecordForm } from "./RecordForm";

interface RecordFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: RecordFormSchema) => void | Promise<void>;
  isSubmitting?: boolean;
  initialValues?: Partial<RecordFormSchema>;
  mode?: "create" | "edit";
}

export function RecordFormModal({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
  initialValues,
  mode = "create",
}: RecordFormModalProps) {
  const title = mode === "create" ? "ایجاد رکورد جدید" : "ویرایش رکورد";

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <RecordForm
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
        initialValues={initialValues}
      />
    </Modal>
  );
}
