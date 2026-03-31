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
import { getTotalTuition } from "@/lib/getTotalTuition";
import { useSetting } from "@/context/SettingContext";

type Props = {
  course: Course[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  isSort?: boolean;
};

export const CourseCardSection = ({
  course,
  isLoading,
  isError,
  isEmpty,
  isSort,
}: Props) => {
  const { settings } = useSetting();

  const sortedCourses = useMemo(() => {
    if (isSort === null) return course;

    return [...course].sort((a, b) => {
      const aTotal = getTotalTuition(a, settings.admissionSeason);
      const bTotal = getTotalTuition(b, settings.admissionSeason);

      return isSort ? aTotal - bTotal : bTotal - aTotal;
    });
  }, [course, isSort, settings.admissionSeason]);

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
