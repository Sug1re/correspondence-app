"use client";

import React, { useMemo } from "react";
import { PaginationButton } from "@/components/Buttons/PaginationButton";
import { SchoolCard } from "@/components/Cards/SchoolCard";
import { School } from "@/entities/school";
import { usePagination } from "@/hooks/usePagination";
import { Loading } from "../Loading";
import { Message } from "../Message";
import { SortButton } from "../Buttons/SortButton";
import { Box } from "@mui/material";
import { useDisclosure } from "@mantine/hooks";

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
  const [isToggle, { toggle }] = useDisclosure(false);

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
      <SortButton selected={isToggle} onToggle={toggle} />

      <SchoolCard school={partSchools} />

      <Box sx={{ display: "flex", justifyContent: "center", pt: 6, pb: 12 }}>
        <PaginationButton
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      </Box>
    </>
  );
};
