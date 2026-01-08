import { z } from "zod";
import { SearchSchoolSchema } from "@/lib/validation/SearchSchoolSchema";

// zodスキーマから型を自動生成
export type SearchSchoolFormValues = z.infer<typeof SearchSchoolSchema>;

// デフォルト値の定義
export const DEFAULT_SEARCH_SCHOOL_VALUES: SearchSchoolFormValues = {
  target: [],
  style: [],
  attendance: [],
  totalFee: [0, 4000000],
};

export type queryValue ={
  target: string,
  minFee: number,
  maxFee: number,
  style: string,
  attendance: string,
};

export const targetOptions = [
  "新入学",
  "転入学",
] as const;

export const styleOptions = [
  "通学",
  "オンライン",
] as const;

export const attendanceOptions = [
  "週1",
  "週3",
  "週5",
  "オンライン"
] as const;