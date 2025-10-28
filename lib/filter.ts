import type { School } from "@/entities/school";

export type FilterConditions = {
  target?: string;
  school?: string;
  style?: string;
  attendance?: string;
};

export const filterSchools = (schools: School[], conditions: FilterConditions) => {
  const { target, school, style, attendance } = conditions;

  return schools.filter((s) => {
    const matchTarget = target ? s.target === target : true;
    const matchSchool = school ? s.school === school : true;
    const matchStyle = style ? s.style === style : true;
    const matchAttendance =
      attendance && attendance !== "オンライン" ? s.attendance1 === attendance : true;

    return matchTarget && matchSchool && matchStyle && matchAttendance;
  });
};
