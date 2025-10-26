import useSWR from "swr";
import type { School } from "@/entities/school";

type TargetType = "entrance" | "transfer";

export type FilterConditions = {
  target?: string;
  school?: string;
  style?: string;
  attendance?: string;
};

type Props = {
  data: School[];
};

// 共通fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json());

// 状態共通処理
const createStatus = (data: Props | undefined, error: unknown) => {
  const schools: School[] = data?.data ?? [];

  return {
    schools,
    isLoading: !data && !error,
    isError: !!error,
    isEmpty: schools.length === 0,
  };
};

// 全件取得
export const useGetSchools = () => {
  const { data, error } = useSWR("/api/sheet", fetcher);
  return createStatus(data, error);
};

// 特定条件取得
export const useGetTargetSchools = (target?: TargetType) => {
  const targetQuery =
    target === "entrance"
      ? "新入学"
      : target === "transfer"
      ? "転入学"
      : undefined;

  const apiUrl = targetQuery
    ? `/api/sheet?target=${encodeURIComponent(targetQuery)}`
    : "/api/sheet";

  const { data, error } = useSWR(apiUrl, fetcher);
  return createStatus(data, error);
};

export const filterSchools = (
  schools: School[],
  conditions: FilterConditions
) => {
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