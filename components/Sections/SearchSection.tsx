"use client";

import React, { useEffect } from "react";
import { SearchBar } from "@/components/Bars/SearchBar";
import { SearchSchoolFormValues } from "@/entities/form";
import { useSearchParams } from "next/navigation";
import { useGetFilteredSchools } from "@/hooks/useSchools";
import { SearchSchoolCardSection } from "./SearchSchoolCardSection";

export const SearchSection = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const targetParam = searchParams.get("target");
    const safeTarget =
      targetParam === "新入学" || targetParam === "転入学"
        ? targetParam
        : undefined;

    const schoolParam = searchParams.get("school");
    const safeSchool =
      schoolParam === "通信制高校" || schoolParam === "サポート校"
        ? schoolParam
        : undefined;

    const styleParam = searchParams.get("style");
    const safeStyle =
      styleParam === "通学" || styleParam === "オンライン"
        ? styleParam
        : undefined;

    const attendanceParam = searchParams.get("attendance");
    const safeAttendance =
      attendanceParam === "週1" ||
      attendanceParam === "週2" ||
      attendanceParam === "週3" ||
      attendanceParam === "週4" ||
      attendanceParam === "週5" ||
      attendanceParam === "自由" ||
      attendanceParam === "オンライン"
        ? attendanceParam
        : undefined;

    const conditions: Partial<SearchSchoolFormValues> = {
      target: safeTarget,
      school: safeSchool,
      style: safeStyle,
      attendance: safeAttendance,
    };

    console.log("受け取った検索条件:", conditions);
  }, [searchParams]);

  const target = searchParams.get("target") ?? undefined;
  const school = searchParams.get("school") ?? undefined;
  const style = searchParams.get("style") ?? undefined;
  const attendance = searchParams.get("attendance") ?? undefined;

  const conditions = { target, school, style, attendance };

  const {
    schools = [],
    isLoading,
    isError,
    isEmpty,
  } = useGetFilteredSchools(conditions);

  return (
    <>
      <SearchBar />

      <SearchSchoolCardSection
        school={schools}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
      />
    </>
  );
};
