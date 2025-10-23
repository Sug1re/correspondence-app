import { z } from "zod";
import { SearchSchoolSchema } from "@/lib/validation/SearchSchoolSchema";

// zodスキーマから型を自動生成
export type SearchSchoolFormValues = z.infer<typeof SearchSchoolSchema>;

export const SearchSchoolDefaultValues: Partial<z.infer<typeof SearchSchoolSchema>> = {
  totalFee: [0, 1000000],
  school: undefined,
  style: undefined,
  attendance: [],
  schooling: undefined,
  target: undefined,
};

export const targetOptions = [
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
  "1月",
  "2月",
  "3月",
] as const;

export const targetEntranceOptions = [
  "4月",
] as const;

export const targetTransferOptions = [
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
  "1月",
  "2月",
  "3月",
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
  "どちらも",
] as const;