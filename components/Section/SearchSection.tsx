"use client";

import React, { useEffect, useState } from "react";
import { SearchBar } from "@/components/Bars/SearchBar";
import { SearchSchoolFormValues } from "@/entities/form";
import { useSearchParams } from "next/navigation";
import { useGetSchools } from "@/hooks/useSchools";
import { SearchSchoolCardSection } from "./SearchSchoolCardSection";

type Props = { season?: "entrance" | "transfer" };

export const SearchSection = ({ season }: Props) => {
  const { schools = [], isLoading, isError } = useGetSchools();
  const searchParams = useSearchParams();
  const [filteredSchools, setFilteredSchools] = useState(schools);

  useEffect(() => {
    if (!isLoading && !isError) {
      // クエリ取得
      const season = searchParams.get("season") || "";
      const school = searchParams.get("school") || "";
      const style = searchParams.get("style") || "";
      const schooling = searchParams.get("schooling") || "";

      // クライアント側でフィルタ
      const result = schools.filter((s) => {
        const matchSeason = season ? s.season === season : true;
        const matchSchool = school ? s.school === school : true;
        const matchStyle = style ? s.style === style : true;
        const matchSchooling = schooling ? s.schooling === schooling : true;
        return matchSeason && matchSchool && matchStyle && matchSchooling;
      });

      setFilteredSchools(result);
      console.log("検索結果:", result);
    }
  }, [schools, isLoading, isError, searchParams]);

  const onSearch = (conditions: SearchSchoolFormValues) => {
    const { season, school, style, schooling } = conditions;
    const result = schools.filter((s) => {
      const matchSeason = season ? s.season === season : true;
      const matchSchool = school ? s.school === school : true;
      const matchStyle = style ? s.style === style : true;
      const matchSchooling = schooling ? s.schooling === schooling : true;

      return matchSeason && matchSchool && matchStyle && matchSchooling;
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
