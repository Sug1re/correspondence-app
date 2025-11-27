"use client";

import React from "react";
import { ToggleButton, Typography } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

type Props = {
  selected: boolean;
  onToggle: () => void;
};

export const SortButton = ({ selected, onToggle }: Props) => {
  return (
    <ToggleButton
      value="sort"
      selected={selected}
      onChange={onToggle}
      disableRipple
      sx={{
        border: "1.5px solid",
        borderRadius: 2,
        bgcolor: "#ffffff",
        gap: 1,
        textTransform: "none",
        transition: "all 0.2s ease-in-out",

        "&:hover": {
          transform: "scale(0.95)",
          bgcolor: "#ffffff",
        },

        "&.Mui-selected": {
          bgcolor: "#003399",
          color: "#fff",
        },

        "&.Mui-selected:hover": {
          transform: "scale(0.95)",
          bgcolor: "#003399",
          color: "#fff",
        },

        "& .MuiSvgIcon-root": {
          fontSize: "1.4rem",
          transition: "transform 0.35s ease",
          transform: selected ? "rotate(0deg)" : "rotate(180deg)",
        },
      }}
    >
      <SortIcon />
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: { xs: "0.9rem", sm: "1rem" },
        }}
      >
        負担額を{selected ? "昇順" : "降順"}で表示
      </Typography>
    </ToggleButton>
  );
};
