import React from "react";
import { Box, Typography } from "@mui/material";

export const HomeText = () => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{ display: "flex", justifyContent: "center", fontWeight: 600 }}
      >
        ようこそ！
      </Typography>
      <Box sx={{ borderRadius: 2, boxShadow: 2, p: 1 }}>
        <Typography sx={{ fontSize: 12 }}>
          あなたの状況に合ったページをお選びください。
          <br />
          4月に入学される方は「入学者向け」、
          <br />
          5月以降に転入を希望される方は「転入者向け」へ
          <br />
          お進みください。
        </Typography>
      </Box>
    </>
  );
};
