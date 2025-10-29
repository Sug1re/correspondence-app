import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { School } from "@/entities/school";

type Props = {
  school: School;
  onClose: () => void;
  onSelect: (value: string, label: string) => void;
};

export const TransferTuitionText = ({ school, onClose, onSelect }: Props) => {
  const months: { key: keyof School; label: string }[] = [
    { key: "april", label: "4月" },
    { key: "may", label: "5月" },
    { key: "june", label: "6月" },
    { key: "july", label: "7月" },
    { key: "august", label: "8月" },
    { key: "september", label: "9月" },
    { key: "october", label: "10月" },
    { key: "november", label: "11月" },
    { key: "december", label: "12月" },
    { key: "january", label: "1月" },
    { key: "february", label: "2月" },
    { key: "march", label: "3月" },
  ];

  return (
    <Box
      sx={{
        mx: { xs: 3, sm: 10 },
        my: 2,
      }}
    >
      <Grid container spacing={2}>
        {months.map(({ key, label }) => {
          const value = school[key];
          if (!value) return null;

          return (
            <Grid key={key} size={6}>
              <Button
                onClick={() => {
                  onSelect(value, label);
                  onClose();
                }}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#003399",
                  color: "#FFFFFF",
                  boxShadow: 1,
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(0.95)",
                    backgroundColor: "#003399",
                  },
                  justifyContent: "center",
                  px: 1,
                  width: 140,
                }}
                disableRipple
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {label}入学の場合
                </Typography>
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
