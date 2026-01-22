import React from "react";
import { Box } from "@mui/material";
import { SearchButton } from "../Buttons/SearchButton";
import { SortButton } from "../Buttons/SortButton";
import { FILTER_SECTION_HEIGHT } from "@/lib/constants";

type Props = {
  isToggle: boolean;
  toggle: () => void;
};

export const FilterSection = ({ isToggle, toggle }: Props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: FILTER_SECTION_HEIGHT,
          gap: 4,
        }}
      >
        <SearchButton />

        <SortButton selected={isToggle} onToggle={toggle} />
      </Box>
    </>
  );
};
