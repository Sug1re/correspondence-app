import { z } from "zod";
import { SearchSchema, SettingSchema } from "@/lib/validation/Schema";

export type SearchFormValues = z.infer<typeof SearchSchema>;

export type SettingFormValues = z.infer<typeof SettingSchema>;

export const DEFAULT_SEARCH_VALUES: SearchFormValues = {
  admissionType: [],
  style: [],
  frequency: [],
  totalFee: [0, 4000000],
};

export const DEFAULT_SETTING_VALUES: SettingFormValues = {
  admissionSeason: "4月",
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

export const admissionSeasonOptions = [
  "4月",
  "7月",
  "10月",
  "1月",
] as const;