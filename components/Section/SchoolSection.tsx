"use client";

import React, { useState } from "react";
import { PaginationButton } from "@/components/Buttons/PaginationButton";
import { SchoolCard } from "@/components/Cards/SchoolCard";
import { useSchools } from "@/hooks/useSchools";

const ITEMS_PER_PAGE = 4;

export const SchoolSection = () => {
  const { schools = [] } = useSchools();
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const partSchools = schools.slice(startIndex, endIndex);
  const totalPages = Math.ceil(schools.length / ITEMS_PER_PAGE);

  return (
    <>
      <PaginationButton
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
      <SchoolCard school={partSchools} />
    </>
  );
};
