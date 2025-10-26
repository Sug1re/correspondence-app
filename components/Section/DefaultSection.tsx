"use client";

import React from "react";
import { SearchBar } from "@/components/Bars/SearchBar";
import { SchoolCardSection } from "@/components/Section/SchoolCardSection";
import { useGetTargetSchools } from "@/hooks/useSchools";
import { SearchSchoolFormValues } from "@/entities/form";

// あとで
// 初期loading時でも遷移してからloadingするようにする

type Props = { target?: "entrance" | "transfer" };

export const DefaultSection = ({ target }: Props) => {
  const {
    schools = [],
    isLoading,
    isError,
    isEmpty,
  } = useGetTargetSchools(target);

  const onSearch = (conditions: SearchSchoolFormValues) => {
    console.log("検索条件:", conditions);
  };

  return (
    <>
      <SearchBar onSearch={onSearch} />

      <SchoolCardSection
        school={schools}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
      />
    </>
  );
};
