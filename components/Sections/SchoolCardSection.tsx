"use client";

import React, { useMemo, useState } from "react";
import { PaginationButton } from "@/components/Buttons/PaginationButton";
import { SchoolCard } from "@/components/Cards/SchoolCard";
import { School } from "@/entities/school";
import { usePagination } from "@/hooks/usePagination";
import { Loading } from "../Loading";
import { Message } from "../Message";
import { SortButton } from "../Buttons/SortButton";
import { Box } from "@mui/material";

type Props = {
  school: School[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
};

export const SchoolCardSection = ({
  school,
  isLoading,
  isError,
  isEmpty,
}: Props) => {
  const [isReversed, setIsReversed] = useState(false);

  const sortedSchools = useMemo(() => {
    return isReversed ? [...school].reverse() : school;
  }, [school, isReversed]);

  const { page, setPage, totalPages, partSchools } =
    usePagination(sortedSchools);

  if (isLoading) return <Loading />;
  if (isError) return <Message message="学校データの取得に失敗しました。" />;
  if (isEmpty) return <Message message="学校データがありません。" />;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 4 }}>
        <PaginationButton
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
        <SortButton onToggle={setIsReversed} />
      </Box>

      <SchoolCard school={partSchools} />
    </>
  );
};
