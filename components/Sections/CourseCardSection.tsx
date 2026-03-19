"use client";

import React, { useMemo } from "react";
import { PaginationButton } from "@/components/Buttons/PaginationButton";
import { CourseCard } from "@/components/Cards/CourseCard";
import { usePagination } from "@/hooks/usePagination";
import { Loading } from "../Loading";
import { Message } from "../Message";
import { Box } from "@mui/material";
import { PAGINATION_BUTTON_HEIGHT } from "@/lib/constants";
import { Course } from "@/entities/course";

type Props = {
  course: Course[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  isToggle?: boolean;
};

export const CourseCardSection = ({
  course,
  isLoading,
  isError,
  isEmpty,
  isToggle,
}: Props) => {
  const sortedCourses = useMemo(() => {
    return isToggle ? [...course].reverse() : course;
  }, [course, isToggle]);

  const { page, setPage, totalPages, partCourses } =
    usePagination(sortedCourses);
  if (isLoading) return <Loading />;
  if (isError) return <Message message="データの取得に失敗しました。" />;
  if (isEmpty) return <Message message="データがありません。" />;

  return (
    <>
      <CourseCard course={partCourses} />

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
