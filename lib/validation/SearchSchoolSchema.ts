import { z } from "zod";

export const SearchSchoolSchema = z.object({

  target: z
  .array(z.enum(["新入学", "転入学"]))
  .min(1, { message: "対象を選択してください。" }),

  totalFee: z
    .tuple([z.number().min(0), z.number().max(4000000)])
    .refine(([min, max]) => min <= max, {
      message: "最小値が最大値を超えています。",
    }),

  style: z
  .array(z.enum(["通学", "オンライン"]))
  .min(1, { message: "スタイルを選択してください。" }),

  attendance: z
    .array(z.enum(["週1", "週3", "週5", "オンライン"]))
    .min(1, { message: "通学頻度を選択してください。" }),

  });