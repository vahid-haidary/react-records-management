import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { Modal } from "@/shared/ui/modal";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import {
  recordFormSchema,
  type RecordFormValuesSchema,
} from "../../schemas/record-form.schema";
import type { RecordModel } from "../../api/model/record.model";
import type { FilterOptionModel } from "../../api/adapter/filters.adapter";

interface RecordFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: RecordFormValuesSchema, statusLabel: string) => void;
  record?: RecordModel | null;
  statusOptions: FilterOptionModel[];
}

export function RecordFormModal({
  open,
  onClose,
  onSubmit,
  record,
  statusOptions,
}: RecordFormModalProps) {
  const isEditMode = Boolean(record);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RecordFormValuesSchema>({
    resolver: zodResolver(recordFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "",
      imageUrl: "",
      imageAlt: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset(
        record
          ? {
              title: record.title,
              description: record.description,
              status: record.status.key,
              imageUrl: record.image.url,
              imageAlt: record.image.alt,
            }
          : {
              title: "",
              description: "",
              status: "",
              imageUrl: "",
              imageAlt: "",
            },
      );
    }
  }, [open, record, reset]);

  const selectedStatusKey = watch("status");

  function submit(values: RecordFormValuesSchema) {
    const statusLabel =
      statusOptions.find((option) => option.key === selectedStatusKey)?.label ??
      "";

    onSubmit(values, statusLabel);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditMode ? "ویرایش رکورد" : "ایجاد رکورد جدید"}
    >
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
        <Input
          id="title"
          label="عنوان"
          {...register("title")}
          error={errors.title?.message}
        />

        <Input
          id="description"
          label="توضیحات"
          {...register("description")}
          error={errors.description?.message}
        />

        <Select
          id="status"
          label="وضعیت"
          {...register("status")}
          options={statusOptions.map((o) => ({ value: o.key, label: o.label }))}
          error={errors.status?.message}
        />

        <Input
          id="imageUrl"
          label="آدرس تصویر"
          {...register("imageUrl")}
          error={errors.imageUrl?.message}
        />

        <Input
          id="imageAlt"
          label="متن جایگزین تصویر"
          {...register("imageAlt")}
          error={errors.imageAlt?.message}
        />

        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            انصراف
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isEditMode ? "ذخیره تغییرات" : "ایجاد رکورد"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
