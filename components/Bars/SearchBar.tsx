"use client";

import React from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDisclosure } from "@mantine/hooks";
import { SearchSchoolModal } from "../Modals/SearchSchoolModal";
import { BAR_HEIGHT } from "@/lib/constants";

const SearchBar = () => {
  const [isOpen, handlers] = useDisclosure(false);

  return (
    <>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          border: `0.5px solid #003399`,
          height: BAR_HEIGHT,
        }}
      >
        <Box>
          <Button
            sx={{
              minWidth: "100%",
              justifyContent: "flex-start",
              color: "#003399",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={handlers.open}
          >
            <Typography
              sx={{
                m: 1,
                gap: 1,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
              }}
            >
              <SearchIcon style={{ fontSize: 28 }} />
              検索
            </Typography>
          </Button>
        </Box>
      </Card>

      <SearchSchoolModal opened={isOpen} onClose={handlers.close} />
    </>
  );
};

export default SearchBar;
