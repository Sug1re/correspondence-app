"use client";

import React, { useState } from "react";
import * as Component from "@/components/index";
import * as Icon from "@/components/icons/index";
import {
  Box,
  Button,
  Card,
  CardActions,
  Container,
  Modal,
} from "@mui/material";

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
          <CardActions>
            <Button
              sx={{
                minWidth: "100%",
                justifyContent: "flex-start",
                color: "#003399",
                fontWeight: 600,
              }}
              onClick={handleOpen}
            >
              <Box
                sx={{
                  pr: 2,
                }}
              >
                <Icon.SearchIcon />
              </Box>
              検索
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
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

export default SearchBar;
