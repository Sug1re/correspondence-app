"use client";

import React from "react";
import { SearchBar } from "@/components/Bars/SearchBar";
import { SchoolCardSection } from "@/components/Section/SchoolCardSection";
import { useSchools } from "@/hooks/useSchools";
import { TestFormValues } from "@/entities/form";

// あとで
// 初期loading時でも遷移してからloadingするようにする

export const HomeSection = () => {
  const { schools = [] } = useSchools();

  const onSearch = (conditions: TestFormValues) => {
    console.log("検索条件:", conditions);
  };

  return (
    <>
      <SearchBar onSearch={onSearch} />

      <SchoolCardSection schools={schools} />
    </>
  );
};
