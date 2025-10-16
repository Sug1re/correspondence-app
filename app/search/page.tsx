"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import * as Component from "@/components/index";
import * as CustomHook from "@/hooks/index";
import { getFilteredFirestoreData } from "@/lib/firebase/getFilteredFirestoreData";
import { School } from "../types/school";
import { Box, Container, Typography } from "@mui/material";

// マウント/アマウントの原因あり

const SearchResultPage = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // ロード中かどうかの状態

  // カスタムフックuseSearchSchoolParams
  const rawParams = CustomHook.useSearchSchoolParams();

  // useMemoで安定化させる
  const params = useMemo(
    () => ({
      totalTuitionFeeValue: rawParams.totalTuitionFeeValue,
      movingOutsideThePrefecture: rawParams.movingOutsideThePrefecture,
      commutingStyle: rawParams.commutingStyle,
      highSchool: rawParams.highSchool,
      attendanceFrequency: rawParams.attendanceFrequency,
    }),
    [
      rawParams.totalTuitionFeeValue,
      rawParams.movingOutsideThePrefecture,
      rawParams.commutingStyle,
      rawParams.highSchool,
      rawParams.attendanceFrequency,
    ]
  );

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true);
      const data = await getFilteredFirestoreData(params);
      setSchools(data);
      setIsLoading(false);
    };

    fetchSchools();
  }, [params]);

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

      <Component.SearchBar />

      {/* ヘッダーバー */}
      <Component.HeaderBar
        totalTuitionFeeValue={rawParams.totalTuitionFeeValue}
        movingOutsideThePrefecture={rawParams.movingOutsideThePrefecture}
        commutingStyle={rawParams.commutingStyle}
        highSchool={rawParams.highSchool}
        attendanceFrequency={rawParams.attendanceFrequency}
      />

      <Container maxWidth="lg">
        {/* 検索窓 */}

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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {/* ページネーションボタン */}
                <Component.PaginationButton
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                />
              </Box>

              <Component.SchoolCardList schools={currentSchools} />
            </>
          )}
        </Box>
        <Component.ScrollTopButton />
      </Container>
    </>
  );
};

const SearchPageWithSuspense = () => (
  <Suspense
    fallback={
      <>
        <Typography>Loading...</Typography>
      </>
    }
  >
    <SearchResultPage />
  </Suspense>
);

export default SearchPageWithSuspense;
