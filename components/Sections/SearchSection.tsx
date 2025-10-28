"use client";

import React from "react";
import { SearchBar } from "@/components/Bars/SearchBar";
import { useSearchParams } from "next/navigation";
import { useGetFilteredSchools } from "@/hooks/useSchools";
import { SearchSchoolCardSection } from "./SearchSchoolCardSection";

export const SearchSection = () => {
  const searchParams = useSearchParams();

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
