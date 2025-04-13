"use client";

import React, { Suspense, useEffect, useState } from "react";
import * as Component from "@/components/index";
import * as CustomHook from "@/hooks/index";
import { getFilteredFirestoreData } from "@/lib/firebase/getFilteredFirestoreData";
import { School } from "../types/school";
import { Box, Container, Typography } from "@mui/material";

const SearchResultPage = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // ロード中かどうかの状態

  // カスタムフックuseSearchSchoolParams
  const {
    course,
    totalTuitionFeeValue,
    movingOutsideThePrefecture,
    commutingStyle,
    highSchool,
    attendanceFrequency,
  } = CustomHook.useSearchSchoolParams();

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true);
      const data = await getFilteredFirestoreData({
        course,
        totalTuitionFeeValue,
        movingOutsideThePrefecture,
        commutingStyle,
        highSchool,
        attendanceFrequency,
      });
      setSchools(data);
      setIsLoading(false);
    };

    fetchSchools();
  }, [
    totalTuitionFeeValue,
    highSchool,
    attendanceFrequency,
    movingOutsideThePrefecture,
    course,
    commutingStyle,
  ]);

  // カスタムフックusePagination
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    handleNextPage,
    handlePrevPage,
  } = CustomHook.usePagination(schools.length);

  const currentSchools = schools.slice(startIndex, endIndex);

  return (
    <>
      <Component.Header />

      {/* ヘッダーバー */}
      <Component.HeaderBar
        movingOutsideThePrefecture={movingOutsideThePrefecture}
        commutingStyle={commutingStyle}
        highSchool={highSchool}
        attendanceFrequency={attendanceFrequency}
      />

      <Container maxWidth="lg">
        {/* 検索窓 */}
        <Component.SearchBar />

        {/* 学校情報 */}
        <Box sx={{ pb: 4 }}>
          {/* ロード中の場合 */}
          {isLoading ? (
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              読み込み中...
            </Typography>
          ) : // 学校が見つからない場合にメッセージを表示
          schools.length === 0 ? (
            <Typography variant="h6" color="text.secondary">
              条件に一致する学校はありませんでした
            </Typography>
          ) : (
            // 学校が見つかった場合
            <>
              {/* ページネーションボタン */}
              <Component.PaginationButton
                currentPage={currentPage}
                totalPages={totalPages}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />

              <Component.SchoolCardList schools={currentSchools} />
            </>
          )}
        </Box>
        <Component.Footer />
      </Container>
    </>
  );
};

const SearchPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchResultPage />
  </Suspense>
);

export default SearchPageWithSuspense;
