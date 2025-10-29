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

  const defaultSum = Number(school.october || 0)

  const anotherSum = school.anotherTuition
    ? school.anotherTuition
        .split("・")
        .filter(Boolean)
        .reduce((acc, item) => acc + Number(item), 0)
    : 0;

    return (baseSum + defaultSum + anotherSum).toLocaleString("ja-JP");

};

export const variableTransferTotalTuition = (school: School, monthValue?: string): string => {
  const baseSum =
    Number(school.enrollmentFee || 0)

  const variableSum =  monthValue ? Number(monthValue.replace(/,/g, "")) : 0;

  const anotherSum = school.anotherTuition
    ? school.anotherTuition
        .split("・")
        .filter(Boolean)
        .reduce((acc, item) => acc + Number(item), 0)
    : 0;

    return (baseSum + variableSum + anotherSum).toLocaleString("ja-JP");

};