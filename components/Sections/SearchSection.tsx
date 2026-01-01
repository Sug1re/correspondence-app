"use client";

import React from "react";
import { SearchButton } from "@/components/Buttons/SearchButton";
import { SchoolCardSection } from "./SchoolCardSection";
import { useSearchParams } from "next/navigation";
import { useGetFilteredSchools } from "@/hooks/useSchools";

export const SearchSection = () => {
  const searchParams = useSearchParams();

  const target = searchParams.get("target") || "";
  const minFee = Number(searchParams.get("minFee") || 0);
  const maxFee = Number(searchParams.get("maxFee") || 0);
  const style = searchParams.get("style") || "";
  const attendance = searchParams.get("attendance") || "";

  const conditions = {
    target,
    minFee,
    maxFee,
    style,
    attendance,
  };

  const {
    schools = [],
    isLoading,
    isError,
    isEmpty,
  } = useGetFilteredSchools(conditions);

  return (
    <>
      <SearchButton />

      <SchoolCardSection
        school={schools}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
      />
    </>
  );
};
