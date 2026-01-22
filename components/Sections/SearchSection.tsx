"use client";

import { SchoolCardSection } from "./SchoolCardSection";
import { useSearchParams } from "next/navigation";
import { useGetFilteredSchools } from "@/hooks/useSchools";
import { queryValue } from "@/entities/form";
import { FilterSection } from "./FilterSection";
import { useDisclosure } from "@mantine/hooks";

export const SearchSection = () => {
  const [isToggle, { toggle }] = useDisclosure(false);

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
      <FilterSection isToggle={isToggle} toggle={toggle} />

      <SchoolCardSection
        school={schools}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
        isToggle={isToggle}
      />
    </>
  );
};
