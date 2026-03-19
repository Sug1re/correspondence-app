"use client";

import { CourseCardSection } from "@/components/Sections/CourseCardSection";
import { useSearchParams } from "next/navigation";
import { useGetFilteredCourses } from "@/hooks/useSchools";
import { queryValue } from "@/entities/form";
import { FilterSection } from "./FilterSection";
import { useDisclosure } from "@mantine/hooks";

export const SearchSection = () => {
  const [isToggle, { toggle }] = useDisclosure(false);

  const searchParams = useSearchParams();

  const conditions: queryValue = {};

  const admissionType = searchParams.get("admissionType");
  if (admissionType) {
    conditions.admissionType = admissionType;
  }

  const style = searchParams.get("style");
  if (style) {
    conditions.style = style;
  }

  const frequency = searchParams.get("frequency");
  if (frequency) {
    conditions.frequency = frequency;
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
    courses = [],
    isLoading,
    isError,
    isEmpty,
  } = useGetFilteredCourses(conditions);

  return (
    <>
      <FilterSection isToggle={isToggle} toggle={toggle} />

      <CourseCardSection
        course={courses}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
        isToggle={isToggle}
      />
    </>
  );
};
