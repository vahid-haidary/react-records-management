import { z } from "zod";

export const recordFormSchema = z.object({
  title: z.string().trim().min(1, "عنوان الزامی است"),
  description: z
    .string()
    .max(255, "توضیحات نباید بیشتر از ۲۵۵ کاراکتر باشد")
    .optional()
    .or(z.literal("")),
  status: z.string().min(1, "وضعیت الزامی است"),
  imageUrl: z
    .string()
    .url("آدرس تصویر معتبر نیست")
    .optional()
    .or(z.literal("")),
  imageAlt: z.string().optional().or(z.literal("")),
});

export type RecordFormValuesSchema = z.infer<typeof recordFormSchema>;
