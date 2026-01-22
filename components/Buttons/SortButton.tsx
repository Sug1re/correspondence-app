"use client";

import React from "react";
import { ToggleButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

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
        color: "#060666ff",
        border: `1px solid #060666ff`,
        width: 40,
        height: 40,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "none",
        transition: "all 0.2s ease-in-out",

        "&:hover": {
          transform: "scale(0.95)",
          bgcolor: "#ffffff",
        },

        "&.Mui-selected": {
          bgcolor: "#060666ff",
          color: "#fff",
        },

        "&.Mui-selected:hover": {
          transform: "scale(0.95)",
          bgcolor: "#060666ff",
          color: "#fff",
        },
      }}
    >
      {selected ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
    </ToggleButton>
  );
};
