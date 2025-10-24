"use client";

import React, { useEffect, useState } from "react";
import { SearchBar } from "@/components/Bars/SearchBar";
import { SearchSchoolFormValues } from "@/entities/form";
import { useSearchParams } from "next/navigation";
import { useGetSchools } from "@/hooks/useSchools";
import { SearchSchoolCardSection } from "./SearchSchoolCardSection";

export const SearchSection = () => {
  const { schools = [], isLoading, isError } = useGetSchools();
  const searchParams = useSearchParams();
  const [filteredSchools, setFilteredSchools] = useState(schools);

  useEffect(() => {
    if (!isLoading && !isError) {
      // クエリ取得
      const school = searchParams.get("school") || "";
      const style = searchParams.get("style") || "";
      const attendance = searchParams.get("attendance") || "";

      // クライアント側でフィルタ
      const result = schools.filter((s) => {
        const matchSchool = school ? s.school === school : true;
        const matchStyle = style ? s.style === style : true;
        const matchAttendance =
          attendance && attendance !== "オンライン"
            ? s.attendance1 === attendance
            : true;

        return matchSchool && matchStyle && matchAttendance;
      });

      setFilteredSchools(result);
      console.log("検索結果:", result);
    }
  }, [schools, isLoading, isError, searchParams]);

  const onSearch = (conditions: SearchSchoolFormValues) => {
    const { school, style, attendance } = conditions;
    const result = schools.filter((s) => {
      const matchSchool = school ? s.school === school : true;
      const matchStyle = style ? s.style === style : true;
      const matchAttendance =
        attendance && attendance !== "オンライン"
          ? s.attendance1 === attendance
          : true;

      return matchSchool && matchStyle && matchAttendance;
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
