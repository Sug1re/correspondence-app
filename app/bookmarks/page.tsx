"use client";

import React from "react";
import { Container } from "@mui/material";
import { BookmarkBar } from "@/components/Bars/BookmarkBar";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";

const BookmarksPage = () => {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <BookmarkBar />

        <ScrollToTopButton />
      </Container>
    </>
  );
};

export default BookmarksPage;
