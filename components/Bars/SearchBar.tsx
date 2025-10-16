"use client";

import React, { useState } from "react";
import * as Component from "@/components/index";
import { Box, Button, Card, Container, Modal, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container maxWidth="md">
        <Card
          sx={{
            my: 2,
            borderRadius: 2,
            boxShadow: 3,
            border: `0.5px solid #003399`,
          }}
        >
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
            onClick={handleOpen}
          >
            <Box>
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
            </Box>
          </Button>

          {/* モーダル */}
          <Modal
            open={open}
            onClose={handleClose}
            BackdropProps={{
              sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
            }}
          >
            <Component.Form handleClose={handleClose} />
          </Modal>
        </Card>
      </Container>
    </>
  );
};

export default SearchBar;
