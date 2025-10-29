"use client";

import React from "react";
import { SearchBar } from "@/components/Bars/SearchBar";
import { SchoolCardSection } from "@/components/Sections/SchoolCardSection";
import { useGetTargetSchools } from "@/hooks/useSchools";

// あとで
// 初期loading時でも遷移してからloadingするようにする

type Props = {
  target?: "entrance" | "transfer";
};

export const DefaultSection = ({ target }: Props) => {
  const {
    schools = [],
    isLoading,
    isError,
    isEmpty,
  } = useGetTargetSchools(target);

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
