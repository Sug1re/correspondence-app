import { Course } from "@/entities/course";

export const getTotalTuition = (
  c: Course,
  admissionSeason: string,
): number => {
  const admissionMap: Record<string, number> = {
    "4月": Number(c.AprilAdmission ?? 0),
    "7月": Number(c.JulyAdmission ?? 0),
    "10月": Number(c.OctoberAdmission ?? 0),
    "1月": Number(c.JanuaryAdmission ?? 0),
  };

  const admissionValue = admissionMap[admissionSeason] ?? 0;

  const baseTuition =
    c.AdmissionType === "新入学"
      ? Number(c.AdmissionAllTuition ?? 0)
      : Number(c.TransferAllTuition ?? 0);

  return baseTuition + admissionValue;
};