import { z } from "zod";

export const formSchema = z.object({
  totalTuitionFeeValue: z
    .tuple([z.number().min(0), z.number().max(4000000)])
    .refine(([min, max]) => min <= max, {
      message: "最小値が最大値を超えています。",
    }),

  movingOutsideThePrefecture: z
    .string()
    .refine((val) => val !== "", {
      message: "県外移動の有無を選択してください。",
    })
    .refine((val) => ["true", "false"].includes(val), {
      message: "県外移動の有無を正しく選択してください。",
    }),

  commutingStyle: z
    .string()
    .refine((val) => val !== "", { message: "通学形態を選択してください。" })
    .refine((val) => ["通学", "オンライン"].includes(val), {
      message: "通学形態を正しく選択してください。",
    }),

  highSchool: z
    .string()
    .refine((val) => val !== "", { message: "学校の種類を選択してください。" })
    .refine((val) => ["通信制高等学校", "サポート校"].includes(val), {
      message: "学校の種類を正しく選択してください。",
    }),

  attendanceFrequency: z
    .array(z.string())
    .min(1,"少なくとも1つ選択してください"),
});

export type FormValues = z.infer<typeof formSchema>;
