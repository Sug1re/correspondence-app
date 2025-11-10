"use client";

import React, { useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { useToggle } from "@mantine/hooks";

type Props = {
  onToggle: (isReversed: boolean) => void;
};

export const SortButton = ({ onToggle }: Props) => {
  const [isReversed, toggle] = useToggle([true, false]);

  useEffect(() => {
    onToggle(isReversed);
  }, [isReversed, onToggle]);

  return (
    <Box>
      <IconButton sx={{ gap: 1 }} onClick={() => toggle()} disableRipple>
        <SortIcon sx={{ transform: isReversed ? "none" : "scaleY(-1)" }} />
        <Typography
          sx={{
            fontWeight: 600,
            color: "#FFFFFF",
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
          }}
        >
          ソート
        </Typography>
      </IconButton>
    </Box>
  );
};
