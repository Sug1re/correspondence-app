"use client";

import React from "react";
import { PaginationButton } from "@/components/Buttons/PaginationButton";
import { School } from "@/entities/school";
import { SearchSchoolCard } from "../Cards/SearchSchoolCard";
import { usePagination } from "@/hooks/usePagination";
import { Loading } from "../Loading";
import { Message } from "../Message";

type Props = {
  school: School[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
};

export const SearchSchoolCardSection = ({
  school,
  isLoading,
  isError,
  isEmpty,
}: Props) => {
  const { page, setPage, totalPages, partSchools } = usePagination(school);

  if (isLoading) return <Loading />;
  if (isError) return <Message message="学校データの取得に失敗しました。" />;
  if (isEmpty) return <Message message="学校データがありません。" />;

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
