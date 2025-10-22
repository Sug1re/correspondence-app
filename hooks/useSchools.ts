import useSWR from "swr";
import type { School } from "@/entities/school";

export const useGetSchools = () => {
  const { data, error } = useSWR("/api/sheet");
  const schools = data?.data as School[];

  const isLoading = !data && !error;
  const isError = !!error;
  const isEmpty = !schools || schools.length === 0;

  return { schools, isLoading, isError, isEmpty };
};
