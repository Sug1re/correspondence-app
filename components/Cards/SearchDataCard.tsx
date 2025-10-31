"use client";

import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { queryValue } from "@/entities/form";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import SchoolIcon from "@mui/icons-material/School";
import ComputerIcon from "@mui/icons-material/Computer";
import BusinessIcon from "@mui/icons-material/Business";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

type Props = {
  conditions: queryValue;
};

export const SearchDataCard = ({ conditions }: Props) => {
  return (
    <>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          border: `0.5px solid #003399`,
          p: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          検索条件
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography sx={{ fontWeight: 600, display: "flex", gap: 1 }}>
            <CalendarMonthIcon />
            {conditions.target}
          </Typography>
          <Typography sx={{ fontWeight: 600, display: "flex", gap: 1 }}>
            <CurrencyYenIcon />
            {conditions.minFee.toLocaleString("ja-JP")} 〜{" "}
            {conditions.maxFee.toLocaleString("ja-JP")}
          </Typography>
          <Typography sx={{ fontWeight: 600, display: "flex", gap: 1 }}>
            <BusinessIcon />
            {conditions.school}
          </Typography>
          <Typography sx={{ fontWeight: 600, display: "flex", gap: 1 }}>
            <ComputerIcon />
            {conditions.style}
          </Typography>
          <Typography sx={{ fontWeight: 600, display: "flex", gap: 1 }}>
            <DirectionsWalkIcon />
            {conditions.attendance}
          </Typography>
          <Typography sx={{ fontWeight: 600, display: "flex", gap: 1 }}>
            <SchoolIcon />
            {conditions.schooling.join("・")}
          </Typography>
        </Box>
      </Card>
    </>
  );
};
