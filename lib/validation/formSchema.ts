import { z } from "zod";

export const formSchema = z.object({
  totalTuitionFeeValue: z
    .tuple([z.number(), z.number().max(4000000)])
    .superRefine(([min, max], ctx) => {
      if (min <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "最小値を0よりも大きくしてください。",
          path: [0],
        });
      }
      if (max <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "最大値を0よりも大きくしてください。",
          path: [1],
        });
      }
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
    .nonempty("少なくとも1つ選択してください"),
});

export type FormValues = z.infer<typeof formSchema>;
