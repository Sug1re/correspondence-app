"use client";

import React, { useEffect, useState } from "react";
import { SearchBar } from "@/components/Bars/SearchBar";
import { SearchSchoolFormValues } from "@/entities/form";
import { useSearchParams } from "next/navigation";
import { filterSchools, useGetSchools } from "@/hooks/useSchools";
import { SearchSchoolCardSection } from "./SearchSchoolCardSection";

export const SearchSection = () => {
  const { schools = [], isLoading, isError } = useGetSchools();
  const searchParams = useSearchParams();
  const [filteredSchools, setFilteredSchools] = useState(schools);

  useEffect(() => {
    if (!isLoading && !isError) {
      const conditions = {
        target: searchParams.get("target") || "",
        school: searchParams.get("school") || "",
        style: searchParams.get("style") || "",
        attendance: searchParams.get("attendance") || "",
      };

      const result = filterSchools(schools, conditions);
      setFilteredSchools(result);
      console.log("検索結果:", result);
    }
  }, [schools, isLoading, isError, searchParams]);

  const onSearch = (conditions: SearchSchoolFormValues) => {
    const result = filterSchools(schools, conditions);
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
