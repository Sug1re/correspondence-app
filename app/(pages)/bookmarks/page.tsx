import React from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { XsWrapper } from "@/components/Wrapper/xsWrapper";
import { Breadcrumb } from "@/components/Breadcrumbs";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { BookmarkBar } from "@/components/Bars/BookmarkBar";
import { BookmarksSection } from "@/components/Sections/BookmarksSection";

export default function BookmarksPage() {
  return (
    <>
      <Header />

      <Breadcrumb />

      <Container maxWidth="md">
        <Stack spacing={2}>
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
