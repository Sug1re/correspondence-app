import { z } from "zod";
import { TestSchema } from "@/lib/validation/TestSchema";

// zodスキーマから型を自動生成
export type TestFormValues = z.infer<typeof TestSchema>;

export const SearchSchoolDefaultValues: Partial<z.infer<typeof TestSchema>> = {
  totalFee: [0, 1000000],
  school: undefined,
  style: undefined,
  attendance: [],
  schooling: undefined,
};

export const schoolOptions = [
  "通信制高校",
  "サポート校",
] as const;

export const styleOptions = [
  "通学",
  "オンライン",
] as const;

export const attendanceOptions = [
  "週1",
  "週2",
  "週3",
  "週4",
  "週5",
  "オンライン",
  "自由",
] as const;

export const schoolingOptions = [
  "県外",
  "県内",
  "どちらも",
] as const;