import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { BAR_HEIGHT, HEADER_HEIGHT } from "@/lib/constants";

export const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `calc(100vh - ${HEADER_HEIGHT}px - ${BAR_HEIGHT}px)`,
        flexDirection: "column",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
