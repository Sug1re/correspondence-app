"use client";

import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

const usePagination = (totalItems: number) => {
  const theme = useTheme(); // MUIのテーマを取得
  const isMdOrUp = useMediaQuery(theme.breakpoints.up("md")); // ブレークポイントで判定

  // 画面サイズに応じて itemsPerPage を切り替え
  const itemsPerPage = isMdOrUp ? 8 : 4;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    handleNextPage,
    handlePrevPage,
    itemsPerPage, // 追加した itemsPerPage を返す
  };
};

export default usePagination;
