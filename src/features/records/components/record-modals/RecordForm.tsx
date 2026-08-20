import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  recordFormSchema,
  type RecordFormSchema,
} from "../../schemas/record-form.schema";

interface RecordFormProps {
  onSubmit: (values: RecordFormSchema) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  initialValues?: Partial<RecordFormSchema>;
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
}: RecordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RecordFormSchema>({
    resolver: zodResolver(recordFormSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      ...initialValues,
    },
  });

  const descriptionLength = watch("description")?.length ?? 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 " noValidate>
      {/* Title */}
      <div className="space-y-1.5">
        <label
          htmlFor="record-title"
          className="block text-sm font-medium text-text"
        >
          عنوان
          <span className="mr-1 text-danger" aria-hidden="true">
            *
          </span>
        </label>

        <input
          id="record-title"
          type="text"
          {...register("title")}
          disabled={isSubmitting}
          placeholder="عنوان رکورد را وارد کنید"
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />

        {errors.title && (
          <p className="text-xs text-danger" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="record-description"
            className="block text-sm font-medium text-text"
          >
            توضیحات
          </label>

          <span className="text-xs text-text-muted">
            {descriptionLength.toLocaleString("fa-IR")}/
            {(255).toLocaleString("fa-IR")}
          </span>
        </div>

        <textarea
          id="record-description"
          {...register("description")}
          disabled={isSubmitting}
          rows={4}
          maxLength={255}
          placeholder="توضیحات رکورد را وارد کنید"
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm leading-6 text-text outline-none transition-colors placeholder:text-text-muted focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />

        {errors.description && (
          <p className="text-xs text-danger" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-1.5">
        <label
          htmlFor="record-status"
          className="block text-sm font-medium text-text"
        >
          وضعیت
          <span className="mr-1 text-danger" aria-hidden="true">
            *
          </span>
        </label>

        <select
          id="record-status"
          {...register("status")}
          disabled={isSubmitting}
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">انتخاب وضعیت</option>
          <option value="active">فعال</option>
          <option value="inactive">غیرفعال</option>
        </select>

        {errors.status && (
          <p className="text-xs text-danger" role="alert">
            {errors.status.message}
          </p>
        )}
      </div>

      {/* Image URL */}
      <div className="space-y-1.5">
        <label
          htmlFor="record-image-url"
          className="block text-sm font-medium text-text"
        >
          آدرس تصویر
        </label>

        <input
          id="record-image-url"
          type="url"
          {...register("imageUrl")}
          disabled={isSubmitting}
          placeholder="https://example.com/image.jpg"
          dir="ltr"
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />

        {errors.imageUrl && (
          <p className="text-xs text-danger" role="alert">
            {errors.imageUrl.message}
          </p>
        )}
      </div>

      {/* Image Alt */}
      <div className="space-y-1.5">
        <label
          htmlFor="record-image-alt"
          className="block text-sm font-medium text-text"
        >
          متن جایگزین تصویر
        </label>

        <input
          id="record-image-alt"
          type="text"
          {...register("imageAlt")}
          disabled={isSubmitting}
          placeholder="توضیح کوتاه برای تصویر"
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="h-11 rounded-lg border border-border px-4 text-sm font-medium text-text transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-60"
        >
          انصراف
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "در حال ذخیره..." : "ذخیره رکورد"}
        </button>
      </div>
    </form>
  );
}
