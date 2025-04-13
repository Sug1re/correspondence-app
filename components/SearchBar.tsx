"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  Container,
  Modal,
} from "@mui/material";
import Form from "./Form";

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{ width: "24px", height: "24px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
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
              <Form handleClose={handleClose} />
            </Modal>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

export default SearchBar;
