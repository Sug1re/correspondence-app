"use client";

import React, { useEffect, useState } from "react";
import { SearchBar } from "@/components/Bars/SearchBar";
import { SearchSchoolFormValues } from "@/entities/form";
import { useSearchParams } from "next/navigation";
import { useSchools } from "@/hooks/useSchools";
import { SearchSchoolCardSection } from "./SearchSchoolCardSection";

export const SearchSection = () => {
  const { schools = [], isLoading, isError } = useSchools();
  const searchParams = useSearchParams();
  const [filteredSchools, setFilteredSchools] = useState(schools);

  useEffect(() => {
    if (!isLoading && !isError) {
      // クエリ取得
      // const totalFeeMin = Number(searchParams.get("totalFeeMin") || 0);
      // const totalFeeMax = Number(searchParams.get("totalFeeMax") || Infinity);
      const school = searchParams.get("school") || "";
      const style = searchParams.get("style") || "";
      const schooling = searchParams.get("schooling") || "";
      // const attendance = searchParams.get("attendance")
      // ? searchParams.get("attendance")!.split(",")
      // : [];

      // クライアント側でフィルタ
      const result = schools.filter((s) => {
        // const matchFee = s.totalFee >= totalFeeMin && s.totalFee <= totalFeeMax;
        const matchSchool = school ? s.school === school : true;
        const matchStyle = style ? s.style === style : true;
        const matchSchooling = schooling ? s.schooling === schooling : true;
        // const matchAttendance =
        // attendance.length > 0
        // ? attendance.some((a) => s.attendance.includes(a))
        // : true;

        return (
          // matchFee &&
          matchSchool && matchStyle && matchSchooling
          // matchAttendance
        );
      });

      setFilteredSchools(result);
      console.log("検索結果:", result);
    }
  }, [schools, isLoading, isError, searchParams]);

  const onSearch = (conditions: SearchSchoolFormValues) => {
    const { school, style, schooling } = conditions;
    const result = schools.filter((s) => {
      const matchSchool = school ? s.school === school : true;
      const matchStyle = style ? s.style === style : true;
      const matchSchooling = schooling ? s.schooling === schooling : true;

      return matchSchool && matchStyle && matchSchooling;
    });

    setFilteredSchools(result);
    console.log("検索条件を更新:", result);
  };

  return (
    <>
      <SearchBar onSearch={onSearch} />

      <SearchSchoolCardSection schools={filteredSchools} />
    </>
  );
};
