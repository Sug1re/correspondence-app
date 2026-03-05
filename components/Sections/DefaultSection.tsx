"use client";

import React from "react";
import { SchoolCardSection } from "@/components/Sections/SchoolCardSection";
import { useGetTargetSchools } from "@/hooks/useSchools";
import { FilterSection } from "./FilterSection";
import { useDisclosure } from "@mantine/hooks";

// あとで
// 初期loading時でも遷移してからloadingするようにする

type Props = {
  target?: "entrance" | "transfer";
};

export const DefaultSection = ({ target }: Props) => {
  const [isToggle, { toggle }] = useDisclosure(false);

  const {
    schools = [],
    isLoading,
    isError,
    isEmpty,
  } = useGetTargetSchools(target);

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
