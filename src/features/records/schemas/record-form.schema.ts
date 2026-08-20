import { z } from "zod";

export const recordFormSchema = z.object({
  title: z.string().trim().min(1, "عنوان الزامی است."),

  description: z.string().max(255, "توضیحات نباید بیشتر از ۲۵۵ کاراکتر باشد."),

  status: z.string().trim().min(1, "وضعیت الزامی است."),

  imageUrl: z
    .string()
    .trim()
    .refine(
      (value) => {
        if (!value) {
          return true;
        }

        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "آدرس تصویر باید یک URL معتبر باشد.",
      },
    ),

  imageAlt: z.string(),
});

export type RecordFormSchema = z.infer<typeof recordFormSchema>;
