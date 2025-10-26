import { School } from "@/entities/school";

export const HEADER_HEIGHT = 60;

export const BAR_HEIGHT = 52;

export const ITEMS_PER_PAGE = 4;

export const entranceTotalTuition = (school: School): string => {
  const sum =
    Number(school.firstTuition || 0) +
    Number(school.secondTuition || 0) +
    Number(school.thirdTuition || 0)

  return sum.toLocaleString("ja-JP");
};
