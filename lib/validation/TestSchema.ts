import { z } from "zod";

export const TestSchema = z.object({

  totalFee: z
    .tuple([z.number().min(0), z.number().max(4000000)])
    .refine(([min, max]) => min <= max, {
      message: "最小値が最大値を超えています。",
    }),

  school: z.enum(["通信制高校", "サポート校"], {
  errorMap: () => ({ message: "学校情報1を選択してください。" }),
  }),

  style: z.enum(["通学", "オンライン"], {
  errorMap: () => ({ message: "学校情報2を選択してください。" }),
  }),

  attendance: z
    .array(z.string())
    .min(1,"登校頻度を選択してください"),

  schooling: z.enum(["県外", "県内", "どちらも"], {
  errorMap: () => ({ message: "スクーリング会場を選択してください。" }),
  }),

});
