"use client";

import React from "react";
import { Box, Pagination } from "@mui/material";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const PaginationButton = ({ page, totalPages, onChange }: Props) => {
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => onChange(value)}
        variant="outlined"
        shape="rounded"
        size="medium"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "gray",
            borderColor: "gray",
            mx: 1,
            "&:hover": { backgroundColor: "inherit" },
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            color: "#FFFFFF",
            backgroundColor: "#003399",
            borderColor: "#003399",
            "&:hover": { backgroundColor: "#003399" },
          },
          "& .MuiPaginationItem-previousNext": {
            color: "#FFFFFF",
            backgroundColor: "#FF6600",
            borderColor: "#FF6600",
            "&:hover": { backgroundColor: "#FF6600" },
          },
          "& .MuiTouchRipple-root": { display: "none" },
        }}
      />
    </Box>
  );
};
