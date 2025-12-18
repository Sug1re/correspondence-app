import React from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { XsWrapper } from "@/components/Wrapper/xsWrapper";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { BookmarkBar } from "@/components/Bars/BookmarkBar";
import { BookmarksSection } from "@/components/Sections/BookmarksSection";

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

      <XsWrapper when={true}>
        <Footer />
      </XsWrapper>
    </>
  );
}
