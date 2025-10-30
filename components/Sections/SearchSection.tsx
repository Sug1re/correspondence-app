"use client";

import React from "react";
import { SearchBar } from "@/components/Bars/SearchBar";
import { SchoolCardSection } from "./SchoolCardSection";
import { useSearchParams } from "next/navigation";
import { useGetFilteredSchools } from "@/hooks/useSchools";

export const SearchSection = () => {
  const searchParams = useSearchParams();

  const target = searchParams.get("target") ?? undefined;
  const school = searchParams.get("school") ?? undefined;
  const style = searchParams.get("style") ?? undefined;
  const attendance = searchParams.get("attendance") ?? undefined;
  const schooling =
    searchParams.getAll("schooling").length > 0
      ? searchParams.getAll("schooling")
      : undefined;

  const conditions = {
    target,
    school,
    style,
    attendance,
    schooling,
  };

  const {
    schools = [],
    isLoading,
    isError,
    isEmpty,
  } = useGetFilteredSchools(conditions);

  return (
    <>
      <SearchBar />

      <SchoolCardSection
        school={schools}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
      />
    </>
  );
};
