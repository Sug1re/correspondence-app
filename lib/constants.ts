import { School } from "@/entities/school";

export const HEADER_HEIGHT = 60;

export const BAR_HEIGHT = 52;

export const ITEMS_PER_PAGE = 4;

export const entranceTotalTuition = (school: School): string => {
  const baseSum =
    Number(school.firstTuition || 0) +
    Number(school.secondTuition || 0) +
    Number(school.thirdTuition || 0);

  const anotherSum = school.anotherTuition
    ? school.anotherTuition
        .split("・")
        .filter(Boolean)
        .reduce((acc, item) => acc + Number(item), 0)
    : 0;

  return (baseSum + anotherSum).toLocaleString("ja-JP");
};

export const transferTotalTuition = (school: School): string => {
  const baseSum =
    Number(school.enrollmentFee || 0)

    // 各月ごとの学費
  const variableSum = 1;

  const anotherSum = school.anotherTuition
    ? school.anotherTuition
        .split("・")
        .filter(Boolean)
        .reduce((acc, item) => acc + Number(item), 0)
    : 0;

    return (baseSum + variableSum +anotherSum).toLocaleString("ja-JP");

};

export const totalTuition = (school: School) => {
  if (school.target === "新入学") {
    return entranceTotalTuition(school);
  }

  if (school.target === "転入学") {
    return transferTotalTuition(school);
  }

  return "-";
};
