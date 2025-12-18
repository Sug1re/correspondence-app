import React from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { BookmarkBar } from "@/components/Bars/BookmarkBar";
import { BookmarksSection } from "@/components/Sections/BookmarksSection";
import FooterWrapper from "@/components/Wrapper/xsWrapper";

export default function BookmarksPage() {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 12 }}>
          <BookmarkBar />

          <BookmarksSection />
        </Stack>
      </Container>

      <ScrollToTopButton />

      <FooterWrapper />
    </>
  );
}
