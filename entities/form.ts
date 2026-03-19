import { z } from "zod";
import { SearchSchema } from "@/lib/validation/SearchSchema";

// zodスキーマから型を自動生成
export type SearchFormValues = z.infer<typeof SearchSchema>;

// デフォルト値の定義
export const DEFAULT_SEARCH_VALUES: SearchFormValues = {
  admissionType: [],
  style: [],
  frequency: [],
  totalFee: [0, 4000000],
};

export type queryValue ={
  alignment?: string;
  admissionType?: string;
  style?: string;
  frequency?: string;
  minFee?: number;
  maxFee?: number;

};

export const admissionTypeOptions = [
  "新入学",
  "転入学",
] as const;

export const styleOptions = [
  "通学",
  "オンライン",
] as const;

export const frequencyOptions = [
  "週1",
  "週3",
  "週5"
] as const;