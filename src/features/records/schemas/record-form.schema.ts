import { z } from "zod";
import { RECORD_DESCRIPTION_MAX_LENGTH } from "../constants/records.constants";

export const recordFormSchema = z.object({
  title: z.string().trim().min(1, "عنوان الزامی است"),

  description: z
    .string()
    .trim()
    .max(
      RECORD_DESCRIPTION_MAX_LENGTH,
      `توضیحات نمی‌تواند بیشتر از ${RECORD_DESCRIPTION_MAX_LENGTH} کاراکتر باشد`,
    )
    .optional()
    .or(z.literal("")),

  status: z.string().min(1, "وضعیت الزامی است"),

  imageUrl: z
    .string()
    .url("آدرس تصویر معتبر نیست")
    .optional()
    .or(z.literal("")),

  imageAlt: z.string().trim().optional().or(z.literal("")),
});

export type RecordFormSchema = z.infer<typeof recordFormSchema>;
