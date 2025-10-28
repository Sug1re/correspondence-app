import useSWR from "swr";
import type { School } from "@/entities/school";
import { fetcher } from "@/lib/fetcher";

type TargetType = "entrance" | "transfer";

type Props = {
  data: School[];
};

// 共通処理
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

export const useGetFilteredSchools = (
  conditions: Partial<Pick<School, "target" | "school" | "style" | "attendance1">>
) => {
  const { target, school, style, attendance1 } = conditions;

  const params = new URLSearchParams();

  if (target) params.append("target", target);
  if (school) params.append("school", school);
  if (style) params.append("style", style);
  if (attendance1) params.append("attendance", attendance1);

  const queryString = params.toString();
  const apiUrl = queryString
    ? `/api/sheet?${queryString}`
    : "/api/sheet";

  const { data, error } = useSWR(apiUrl, fetcher);
  return createStatus(data, error);
};