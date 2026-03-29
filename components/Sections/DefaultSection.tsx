"use client";

import React from "react";
import { CourseCardSection } from "@/components/Sections/CourseCardSection";
import { useGetAdmissionType } from "@/hooks/useSchools";
import { FilterSection } from "./FilterSection";
import { useDisclosure } from "@mantine/hooks";

// あとで
// 初期loading時でも遷移してからloadingするようにする

type Props = {
  admissionType?: "admission" | "transfer";
};

export const DefaultSection = ({ admissionType }: Props) => {
  const [isSort, { toggle: toggleSort }] = useDisclosure(false);

  const [isSetting, { toggle: toggleSetting }] = useDisclosure(false);

  const {
    courses = [],
    isLoading,
    isError,
    isEmpty,
  } = useGetAdmissionType(admissionType);

  return (
    <>
      <FilterSection
        isSort={isSort}
        isSetting={isSetting}
        toggleSort={toggleSort}
        toggleSetting={toggleSetting}
      />

      <CourseCardSection
        course={courses}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
        isSort={isSort}
        isSetting={isSetting}
      />
    </>
  );
};
