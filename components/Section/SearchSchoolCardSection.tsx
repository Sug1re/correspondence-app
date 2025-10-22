"use client";

import React, { useState } from "react";
import { PaginationButton } from "@/components/Buttons/PaginationButton";
import { School } from "@/entities/school";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { SearchSchoolCard } from "../Cards/SearchSchoolCard";

type Props = {
  schools: School[];
};

export const SearchSchoolCardSection = ({ schools }: Props) => {
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
      <SearchSchoolCard school={partSchools} />
    </>
  );
};
