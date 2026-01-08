import { z } from "zod";

export const SearchSchoolSchema = z.object({

  target: z
  .array(z.enum(["新入学", "転入学"])),

  style: z
  .array(z.enum(["通学", "オンライン"])),

  attendance: z
    .array(z.enum(["週1", "週3", "週5", "オンライン"])),

 totalFee: z
    .tuple([z.number().min(0), z.number().min(0)])
    .refine(([min, max]) => !(min === 0 && max === 0), {
      message: "予算を決めてください。"}),

  });