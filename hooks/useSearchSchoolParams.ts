"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const useSearchSchoolParams = () => {
  const searchParams = useSearchParams();

  const totalTuitionFeeValue = useMemo<[number, number]>(() => {
    const min = searchParams.get("totalTuitionFeeMin");
    const max = searchParams.get("totalTuitionFeeMax");

    return [
      min ? parseInt(min) : 0,
      max ? parseInt(max) : 4000000,
    ];
  }, [searchParams]);

  const movingOutsideThePrefecture = useMemo(() => {
    return searchParams.get("movingOutsideThePrefecture") === "true";
  }, [searchParams]);

  const commutingStyle = useMemo(() => {
    return searchParams.get("commutingStyle") || "";
  }, [searchParams]);

  const highSchool = useMemo(() => {
    return searchParams.get("highSchool") || "";
  }, [searchParams]);

  const attendanceFrequency = useMemo(() => {
    const value = searchParams.get("attendanceFrequency");
    return value ? value.split(",") : [];
  }, [searchParams]);
  

  return {
    totalTuitionFeeValue,
    movingOutsideThePrefecture,
    commutingStyle,
    highSchool,
    attendanceFrequency,
  };
};

export default useSearchSchoolParams;
