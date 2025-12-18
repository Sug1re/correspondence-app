import React from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import FooterWrapper from "@/components/Wrapper/xsWrapper";

export default function FaqPage() {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 12 }}></Stack>
      </Container>

      <ScrollToTopButton />

      <FooterWrapper />
    </>
  );
}
