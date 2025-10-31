"use client";

import React from "react";
import { SearchBar } from "@/components/Bars/SearchBar";
import { SchoolCardSection } from "./SchoolCardSection";
import { useSearchParams } from "next/navigation";
import { useGetFilteredSchools } from "@/hooks/useSchools";
import { SearchDataCard } from "../Cards/SearchDataCard";

export const SearchSection = () => {
  const searchParams = useSearchParams();

  const target = searchParams.get("target") || "";
  const minFee = Number(searchParams.get("minFee") || 0);
  const maxFee = Number(searchParams.get("maxFee") || 0);
  const school = searchParams.get("school") || "";
  const style = searchParams.get("style") || "";
  const attendance = searchParams.get("attendance") || "";
  const schooling = searchParams.getAll("schooling");

  const conditions = {
    target,
    minFee,
    maxFee,
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

      <SearchDataCard conditions={conditions} />

      <SchoolCardSection
        school={schools}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
      />
    </>
  );
};
