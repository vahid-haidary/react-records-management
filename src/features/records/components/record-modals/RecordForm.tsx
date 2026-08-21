import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  recordFormSchema,
  type RecordFormSchema,
} from "../../schemas/record-form.schema";
import { RECORD_DESCRIPTION_MAX_LENGTH } from "../../constants/records.constants";
import { Select } from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import type { FilterOptionModel } from "../../api/adapter/records.adapter";

export interface RecordFormProps {
  onSubmit: (values: RecordFormSchema) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  initialValues?: Partial<RecordFormSchema>;
  statusOptions: FilterOptionModel[];
}

const DEFAULT_VALUES: RecordFormSchema = {
  title: "",
  description: "",
  status: "",
  imageUrl: "",
  imageAlt: "",
};

export function RecordForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
  initialValues,
  statusOptions,
}: RecordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RecordFormSchema>({
    resolver: zodResolver(recordFormSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      ...initialValues,
    },
  });

  const description = useWatch({
    control,
    name: "description",
  });

  const descriptionLength = description?.length ?? 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 " noValidate>
      {/* title */}
      <Input
        id="record-title"
        type="text"
        label={
          <>
            عنوان
            <span className="mr-1 text-danger">*</span>
          </>
        }
        {...register("title")}
        disabled={isSubmitting}
        placeholder="عنوان رکورد را وارد کنید"
        error={errors.title?.message}
      />

      {/* desc */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="record-description"
            className="block text-sm font-medium text-text"
          >
            توضیحات
          </label>

          <span className="text-xs text-text-muted">
            {descriptionLength.toLocaleString("fa-IR")}/
            {RECORD_DESCRIPTION_MAX_LENGTH.toLocaleString("fa-IR")}
          </span>
        </div>

        <Textarea
          id="record-description"
          {...register("description")}
          disabled={isSubmitting}
          rows={4}
          maxLength={RECORD_DESCRIPTION_MAX_LENGTH}
          placeholder="توضیحات رکورد را وارد کنید"
          className="resize-none hide-scrollbar"
          error={errors.description?.message}
        />
      </div>

      {/* Status */}
      <Select
        id="record-status"
        label="وضعیت"
        {...register("status")}
        disabled={isSubmitting}
        error={errors.status?.message}
        placeholder="انتخاب وضعیت"
        options={statusOptions.map((option) => ({
          value: option.key,
          label: option.label,
        }))}
      />

      {/* image */}
      <Input
        id="record-image-url"
        type="url"
        label="آدرس تصویر"
        {...register("imageUrl")}
        disabled={isSubmitting}
        placeholder="https://google.com/image.jpg"
        dir="ltr"
        error={errors.imageUrl?.message}
      />

      {/* image alt */}
      <Input
        id="record-image-alt"
        type="text"
        label="متن جایگزین تصویر"
        {...register("imageAlt")}
        disabled={isSubmitting}
        placeholder="توضیح کوتاه برای تصویر"
        error={errors.imageAlt?.message}
      />

      {/* actions */}
      <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
        <Button
          variant="ghost"
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="h-11 rounded-lg border border-border px-4 text-sm font-medium text-text transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-60"
        >
          انصراف
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "در حال ذخیره..." : "ذخیره رکورد"}
        </Button>
      </div>
    </form>
  );
}
