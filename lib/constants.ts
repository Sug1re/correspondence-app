import { School } from "@/entities/school";

export const HEADER_HEIGHT = 60;

export const BAR_HEIGHT = 52;

export const ITEMS_PER_PAGE = 4;

export const BREADCRUMB_LABELS: Record<string, string> = {
  bookmarks: "ブックマーク一覧",
  entrance: "新入学",
  faq: "よくある質問",
  search: "学校検索",
  transfer: "転入学",
};


export const getDriveImageUrl = (school: School): string | undefined => {
  return school.picture ? `/api/drive?id=${school.picture}` : undefined;
};

export const monthlyData = (school: School): boolean => {
  return [
    school.april,
    school.may,
    school.june,
    school.july,
    school.august,
    school.september,
    school.october,
    school.november,
    school.december,
    school.january,
    school.february,
    school.march,
  ].some((month) => month && month.trim() !== "");
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