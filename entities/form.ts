import { z } from "zod";
import { SearchSchoolSchema } from "@/lib/validation/SearchSchoolSchema";

// zodスキーマから型を自動生成
export type SearchSchoolFormValues = z.infer<typeof SearchSchoolSchema>;

export const SearchSchoolDefaultValues: Partial<z.infer<typeof SearchSchoolSchema>> = {
  target: undefined,
  totalFee: [0, 1000000],
  school: undefined,
  style: undefined,
  attendance: undefined,
  schooling: [],
};

export const targetOptions = [
  "新入学",
  "転入学",
] as const;

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
] as const;