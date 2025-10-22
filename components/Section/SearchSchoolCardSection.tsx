"use client";

import React from "react";
import { PaginationButton } from "@/components/Buttons/PaginationButton";
import { School } from "@/entities/school";
import { SearchSchoolCard } from "../Cards/SearchSchoolCard";
import { usePagination } from "@/hooks/usePagination";

type Props = {
  schools: School[];
};

export const SearchSchoolCardSection = ({ schools }: Props) => {
  const { page, setPage, totalPages, partSchools } = usePagination(schools);

  return (
    <>
      <PaginationButton
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
      <SearchSchoolCard school={partSchools} />
    </>
  );
};
