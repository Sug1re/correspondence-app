"use client";

import React from "react";
import { SearchBar } from "@/components/Bars/SearchBar";
import { SchoolCardSection } from "@/components/Section/SchoolCardSection";
import { useGetSchools } from "@/hooks/useSchools";
import { SearchSchoolFormValues } from "@/entities/form";

// あとで
// 初期loading時でも遷移してからloadingするようにする

type Props = { season?: "entrance" | "transfer" };

export const DefaultSection = ({ season }: Props) => {
  const { schools = [] } = useGetSchools();

  const onSearch = (conditions: SearchSchoolFormValues) => {
    console.log("検索条件:", conditions);
  };

  return (
    <>
      <SearchBar onSearch={onSearch} season={season} />

      <SchoolCardSection schools={schools} season={season} />
    </>
  );
};
