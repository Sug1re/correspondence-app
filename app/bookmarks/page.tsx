"use client";

import React from "react";
import { Box, Card, Container, Typography } from "@mui/material";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";

import ListIcon from "@mui/icons-material/List";

const BookmarksPage = () => {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Card
          sx={{
            my: 2,
            borderRadius: 2,
            boxShadow: 3,
            border: `0.5px solid #003399`,
            height: 52,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              px: 1,
            }}
          >
            <Typography
              sx={{
                minWidth: "100%",
                justifyContent: "flex-start",
                color: "#003399",
                fontWeight: 600,
                m: 1,
                gap: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListIcon style={{ fontSize: 28 }} />
              お気に入り学校一覧
            </Typography>
          </Box>
        </Card>

        <ScrollToTopButton />
      </Container>
    </>
  );
};

export default BookmarksPage;
