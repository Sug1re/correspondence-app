import React from "react";
import { Box, Pagination } from "@mui/material";

export const PaginationButton = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          size="medium"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "gray",
              borderColor: "gray",
              mx: 1,
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              color: "#FFFFFF",
              backgroundColor: "#003399",
              borderColor: "#003399",
            },
            "& .MuiPaginationItem-previousNext": {
              color: "#FFFFFF",
              backgroundColor: "#FF6600",
              borderColor: "#FF6600",
            },
            "& .MuiTouchRipple-root": {
              display: "none",
            },
          }}
        />
      </Box>
    </>
  );
};
