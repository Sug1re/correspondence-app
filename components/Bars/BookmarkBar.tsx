import React from "react";
import { Box, Typography } from "@mui/material";

import ListIcon from "@mui/icons-material/List";

export const BookmarkBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: 70,
        px: 1,
      }}
    >
      <Typography
        sx={{
          minWidth: "100%",
          justifyContent: "flex-start",
          color: "#060666ff",
          fontWeight: 600,
          m: 1,
          gap: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ListIcon style={{ fontSize: 28 }} />
        お気に入り学校一覧
      </Typography>
    </Box>
  );
};
