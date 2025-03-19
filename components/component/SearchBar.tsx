"use client";

import React, { useState } from "react";
import { Box, Button, Card, CardActions, Modal } from "@mui/material";
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
      <Card
        sx={{
          mt: 2,
          borderRadius: 2,
          boxShadow: 3,
          border: `2px solid #003399`,
        }}
      >
        <CardActions>
          <Button
            sx={{
              minWidth: 327,
              justifyContent: "flex-start",
              color: "#003399",
            }}
            onClick={handleOpen}
          >
            <Box>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
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
          <Modal open={open} onClose={handleClose}>
            <Form handleClose={handleClose} />
          </Modal>
        </CardActions>
      </Card>
    </>
  );
};

export default SearchBar;
