"use client";

import { useSearchParams } from "next/navigation";

const useSearchSchoolParams = () => {
  const searchParams = useSearchParams();

  const course = searchParams.get("course") || "";
  const totalTuitionFee = searchParams.get("totalTuitionFee")
    ? parseInt(searchParams.get("totalTuitionFee")!)
    : NaN;
  const movingOutsideThePrefecture =
    searchParams.get("movingOutsideThePrefecture") === "true";
  const commutingStyle = searchParams.get("commutingStyle") || "";
  const highSchool = searchParams.get("highSchool") || "";
  const attendanceFrequency = searchParams.get("attendanceFrequency") || "";

  return {
    course,
    totalTuitionFee,
    movingOutsideThePrefecture,
    commutingStyle,
    highSchool,
    attendanceFrequency,
  };
};

export default useSearchSchoolParams;
