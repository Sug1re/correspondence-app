"use client";

import React from "react";
import { SchoolCardSection } from "@/components/Sections/SchoolCardSection";
import { useGetAdmissionType } from "@/hooks/useSchools";
import { FilterSection } from "./FilterSection";
import { useDisclosure } from "@mantine/hooks";

// あとで
// 初期loading時でも遷移してからloadingするようにする

type Props = {
  admissionType?: "admission" | "transfer";
};

export const DefaultSection = ({ admissionType }: Props) => {
  const [isToggle, { toggle }] = useDisclosure(false);

  const {
    courses = [],
    isLoading,
    isError,
    isEmpty,
  } = useGetAdmissionType(admissionType);

  return (
    <>
      <FilterSection isToggle={isToggle} toggle={toggle} />

      <SchoolCardSection
        course={courses}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
        isToggle={isToggle}
      />
    </>
  );
};
