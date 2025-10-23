"use client";

import React from "react";
import { PaginationButton } from "@/components/Buttons/PaginationButton";
import { SchoolCard } from "@/components/Cards/SchoolCard";
import { School } from "@/entities/school";
import { usePagination } from "@/hooks/usePagination";

type Props = {
  schools: School[];
  target?: "entrance" | "transfer";
};

export const SchoolCardSection = ({ schools, target }: Props) => {
  const { page, setPage, totalPages, partSchools } = usePagination(schools);

  return (
    <>
      <PaginationButton
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
      <SchoolCard school={partSchools} target={target} />
    </>
  );
};
