"use client";

import React from "react";
import { Container, Stack } from "@mui/material";
import { BookmarkBar } from "@/components/Bars/BookmarkBar";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";

const BookmarksPage = () => {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 4 }}>
          <BookmarkBar />
        </Stack>
      </Container>

      <ScrollToTopButton />
    </>
  );
};

export default BookmarksPage;
