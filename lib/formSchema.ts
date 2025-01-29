import { z } from "zod"

// Zodスキーマの定義
const formSchema = z.object({
    initialSetupCosts: z
      .number()
      .min(0, "初期費用を選択してください。"),
    tuitionFee: z
      .number()
      .min(0, "授業料を選択してください。"),
    testFee: z
      .number()
      .min(0, "受験料を選択してください。"),
    schooling: z.enum(["true", "false"], {
      errorMap: () => ({ message: "スクーリングの有無を選択してください。" }),
    }),
    movingOutsideThePrefecture: z.enum(["true", "false"], {
      errorMap: () => ({ message: "県外移動の有無を選択してください。" }),
    }),
    commutingStyle: z.enum(["通学", "オンライン"], {
      errorMap: () => ({ message: "通学形態を選択してください。" }),
    }),
    highSchool: z.enum(["通信制高等学校", "サポート校"], {
      errorMap: () => ({ message: "学校の種類を選択してください。" }),
    }),
    attendanceFrequency: z.enum(["週1", "週2", "週3", "週4", "週5", "オンライン", "自由"], {
      errorMap: () => ({ message: "登校頻度を選択してください。" }),
    }),
  });