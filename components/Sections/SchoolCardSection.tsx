"use client";

import React, { useMemo } from "react";
import { PaginationButton } from "@/components/Buttons/PaginationButton";
import { SchoolCard } from "@/components/Cards/SchoolCard";
import { School } from "@/entities/school";
import { usePagination } from "@/hooks/usePagination";
import { Loading } from "../Loading";
import { Message } from "../Message";
import { Box } from "@mui/material";
import { PAGINATION_BUTTON_HEIGHT } from "@/lib/constants";

type Props = {
  school: School[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  isToggle?: boolean;
};

export const SchoolCardSection = ({
  school,
  isLoading,
  isError,
  isEmpty,
  isToggle,
}: Props) => {
  const sortedSchools = useMemo(() => {
    return isToggle ? [...school].reverse() : school;
  }, [school, isToggle]);

  const { page, setPage, totalPages, partSchools } =
    usePagination(sortedSchools);

  if (isLoading) return <Loading />;
  if (isError) return <Message message="学校データの取得に失敗しました。" />;
  if (isEmpty) return <Message message="学校データがありません。" />;

  return (
    <>
      <SchoolCard school={partSchools} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: PAGINATION_BUTTON_HEIGHT,
        }}
      >
        <PaginationButton
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      </Box>
    </>
  );
};
