import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { queryValue } from "@/entities/form";
import type{ Course } from "@/entities/course";

type AdmissionType = "admission" | "transfer";

type Props = {
  data: Course[];
};

// 共通処理
const createStatus = (data: Props | undefined, error: unknown) => {
  const courses: Course[] = data?.data ?? [];

  return {
    courses,
    isLoading: !data && !error,
    isError: !!error,
    isEmpty: courses.length === 0,
  };
};

// 全件取得
export const useGetCourses = () => {
  const { data, error } = useSWR("/api/sheet", fetcher);
  return createStatus(data, error);
};

// 特定条件取得
export const useGetAdmissionType = (AdmissionType?: AdmissionType) => {
  const admissionTypeQuery =
    AdmissionType === "admission"
      ? "新入学"
      : AdmissionType === "transfer"
      ? "転入学"
      : undefined;

  const apiUrl = admissionTypeQuery
    ? `/api/sheet?admissionType=${encodeURIComponent(admissionTypeQuery)}`
    : null;

  const { data, error } = useSWR<Props>(apiUrl, fetcher);

  const status = createStatus(data, error);

  if (!admissionTypeQuery) {
    return { ...status, schools: [], isEmpty: true, isLoading: false };
  }

  return status;
};

export const useGetFilteredCourses = (
conditions: queryValue
) => {
  const { alignment, style, frequency, admissionType, minFee, maxFee  } = conditions;

  const params = new URLSearchParams();

  if (alignment) {
    params.append("alignment", alignment);
  }

  if (admissionType) {
    params.append("admissionType", admissionType);
  }

  if (style) {
    params.append("style", style);
  }

  if (frequency) {
    params.append("frequency", frequency);
  }

  if (minFee !== undefined) {
    params.append("minFee", String(minFee));
  }

  if (maxFee !== undefined) {
    params.append("maxFee", String(maxFee));
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

export const useGetBookmarkedCourses = (Id: string[] = []) => {
  const apiUrl =
    Id.length > 0
      ? `/api/sheet?ids=${Id.map(encodeURIComponent).join(",")}`
      : null;

  const { data, error } = useSWR<Props>(apiUrl, fetcher);

  const status = createStatus(data, error);
  if (Id.length === 0) {
    return { ...status, courses: [], isEmpty: true, isLoading: false };
  }
  return status;
};