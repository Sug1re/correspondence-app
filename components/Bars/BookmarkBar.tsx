import React from "react";
import { Box, Card, Typography } from "@mui/material";

import ListIcon from "@mui/icons-material/List";

export const BookmarkBar = () => {
  return (
    <Card
      sx={{
        my: 2,
        borderRadius: 2,
        boxShadow: 3,
        border: `0.5px solid #003399`,
        height: 52,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          px: 1,
        }}
      >
        <Typography
          sx={{
            minWidth: "100%",
            justifyContent: "flex-start",
            color: "#003399",
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
    </Card>
  );
};
