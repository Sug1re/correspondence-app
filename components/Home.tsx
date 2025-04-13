"use client";

import React, { useEffect, useState } from "react";
import * as Component from "@/components/index";
import * as CustomHook from "@/hooks/index";
import { getAllFirestoreData } from "@/lib/firebase/getAllFirestoreData";
import { School } from "@/app/types/school";
import { Box, Typography } from "@mui/material";

const Home = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // ロード中かどうかの状態

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const schoolsData = await getAllFirestoreData();
        setSchools(schoolsData);
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchools();
  }, []);

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

            {/* スクールカードリスト */}
            <Component.SchoolCardList schools={currentSchools} />
          </>
        )}
      </Box>
    </>
  );
};

export default Home;
