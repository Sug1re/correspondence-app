import React from "react";
import { Box, Typography } from "@mui/material";
import { School } from "@/entities/school";

import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";

type Props = {
  school: School;
  transferValue?: string | null;
  transferLabel?: string | null;
};

export const TuitionText = ({
  school,
  transferValue,
  transferLabel,
}: Props) => {
  return (
    <Box
      sx={{
        mx: { xs: 3, sm: 10 },
        my: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {school.firstTuition && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            初年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(school.firstTuition).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {school.enrollmentFee && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            入学時に発生する学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(school.enrollmentFee).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {school.secondTuition && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            2年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(school.secondTuition).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {school.thirdTuition && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            3年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(school.thirdTuition).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {transferValue && transferLabel ? (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 600 }}>
            {transferLabel}入学の場合
          </Typography>
          <Typography
            sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(transferValue).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      ) : (
        school.october && (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 600 }}>10月入学の場合</Typography>
            <Typography
              sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
            >
              <CurrencyYenIcon style={{ fontSize: 18 }} />
              {Number(school.october).toLocaleString("ja-JP")}
            </Typography>
          </Box>
        )
      )}

      {school.anotherTuitionName && school.anotherTuition && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {school.anotherTuitionName.split("・").map((name, index) => {
            const tuitionItems = school.anotherTuition
              .split("・")
              .filter(Boolean)
              .map((item) => Number(item).toLocaleString("ja-JP"));

            return (
              <Box
                key={index}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ fontWeight: 600 }}>{name}</Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CurrencyYenIcon style={{ fontSize: 18 }} />
                  {tuitionItems[index] ?? ""}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
