"use client";

import React from "react";
import { SearchBar } from "@/components/Bars/SearchBar";
import { SchoolCardSection } from "@/components/Section/SchoolCardSection";
import { useGetSchools } from "@/hooks/useSchools";
import { SearchSchoolFormValues } from "@/entities/form";

// あとで
// 初期loading時でも遷移してからloadingするようにする

export const DefaultSection = () => {
  const { schools = [] } = useGetSchools();

  const onSearch = (conditions: SearchSchoolFormValues) => {
    console.log("検索条件:", conditions);
  };

  return (
    <>
      <SearchBar onSearch={onSearch} />

      <SchoolCardSection schools={schools} />
    </>
  );
};
