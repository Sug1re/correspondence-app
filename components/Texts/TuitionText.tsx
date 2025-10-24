import React from "react";
import { Box, Typography } from "@mui/material";
import { School } from "@/entities/school";

import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";

type Props = {
  school: School;
};

export const TuitionText = ({ school }: Props) => {
  return (
    <Box sx={{ m: 2 }}>
      {school.firstTuition && (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Typography>初年次の学費</Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 28 }} />
            {Number(school.firstTuition).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {school.secondTuition && (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Typography>2年次の学費</Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 28 }} />
            {Number(school.secondTuition).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {school.thirdTuition && (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Typography>3年次の学費</Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 28 }} />
            {Number(school.thirdTuition).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
