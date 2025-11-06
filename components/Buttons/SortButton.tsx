"use client";

import React, { useEffect } from "react";
import { Box, IconButton } from "@mui/material";
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
      <IconButton disableRipple onClick={() => toggle()}>
        <SortIcon sx={{ transform: isReversed ? "none" : "scaleY(-1)" }} />
      </IconButton>
    </Box>
  );
};
