"use client";

import { useSearchParams } from "next/navigation";

const useSearchSchoolParams = () => {
  const searchParams = useSearchParams();


  const totalTuitionFeeMin = searchParams.get("totalTuitionFeeMin");
  const totalTuitionFeeMax = searchParams.get("totalTuitionFeeMax");

  const totalTuitionFeeValue: [number, number] = [
    totalTuitionFeeMin ? parseInt(totalTuitionFeeMin) : 0,
    totalTuitionFeeMax ? parseInt(totalTuitionFeeMax) : 4000000,
  ];
  const movingOutsideThePrefecture =
    searchParams.get("movingOutsideThePrefecture") === "true";
  const commutingStyle = searchParams.get("commutingStyle") || "";
  const highSchool = searchParams.get("highSchool") || "";
  const attendanceFrequency = searchParams.getAll("attendanceFrequency");

  return {
    totalTuitionFeeValue,
    movingOutsideThePrefecture,
    commutingStyle,
    highSchool,
    attendanceFrequency,
  };
};

export default useSearchSchoolParams;
