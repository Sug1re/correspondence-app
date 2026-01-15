"use client";

import { SearchButton } from "@/components/Buttons/SearchButton";
import { SchoolCardSection } from "./SchoolCardSection";
import { useSearchParams } from "next/navigation";
import { useGetFilteredSchools } from "@/hooks/useSchools";
import { queryValue } from "@/entities/form";

export const SearchSection = () => {
  const searchParams = useSearchParams();

  const conditions: queryValue = {};

  const target = searchParams.get("target");
  if (target) {
    conditions.target = target;
  }

  const style = searchParams.get("style");
  if (style) {
    conditions.style = style;
  }

  const attendance = searchParams.get("attendance");
  if (attendance) {
    conditions.attendance = attendance;
  }

  const alignment = searchParams.get("alignment");
  if (alignment) {
    conditions.alignment = alignment;
  }

  const minFee = searchParams.get("minFee");
  if (minFee !== null) {
    conditions.minFee = Number(minFee);
  }

  const maxFee = searchParams.get("maxFee");
  if (maxFee !== null) {
    conditions.maxFee = Number(maxFee);
  }

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
