import { z } from "zod";

export const SearchSchoolSchema = z.object({

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

  attendance: z.enum(["週1", "週2", "週3", "週4", "週5", "自由", "オンライン"],{
    errorMap: () => ({ message: "登校頻度を選択してください。" }),
    }),

  schooling: z
    .array(z.enum(["県外", "県内"]))
    .min(1, { message: "スクーリング会場を選択してください。" }),
});
