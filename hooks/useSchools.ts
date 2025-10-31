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
    : null;

  const { data, error } = useSWR<Props>(apiUrl, fetcher);

  const status = createStatus(data, error);

  if (!targetQuery) {
    return { ...status, schools: [], isEmpty: true, isLoading: false };
  }

  return status;
};

export const useGetFilteredSchools = (
  conditions: Partial<Pick<School, "target" | "school" | "style" | "attendance">> & {
    schooling?: string[];
    minFee?: number;
    maxFee?: number;
  }
) => {
  const { target, minFee, maxFee, school, style, attendance, schooling } = conditions;

  const params = new URLSearchParams();

  if (target) params.append("target", target);
  if (minFee) params.append("minFee", String(minFee));
  if (maxFee) params.append("maxFee", String(maxFee));
  if (school) params.append("school", school);
  if (style) params.append("style", style);
  if (attendance) params.append("attendance", attendance);
  if (schooling && Array.isArray(schooling)) {
    schooling.forEach((item) => {
      params.append("schooling", item);
    });
  }

  const queryString = params.toString();
  const apiUrl = queryString ? `/api/sheet?${queryString}` : null;

  const { data, error } = useSWR<Props>(apiUrl, fetcher);

  const status = createStatus(data, error);

  if (!queryString) {
    return { ...status, schools: [], isEmpty: true, isLoading: false };
  }

  return status;
};

export const useGetBookmarkedSchools = (schoolIds: string[] = []) => {
  const apiUrl =
    schoolIds.length > 0
      ? `/api/sheet?ids=${schoolIds.map(encodeURIComponent).join(",")}`
      : null;

  const { data, error } = useSWR<Props>(apiUrl, fetcher);

  const status = createStatus(data, error);
  if (schoolIds.length === 0) {
    return { ...status, schools: [], isEmpty: true, isLoading: false };
  }
  return status;
};