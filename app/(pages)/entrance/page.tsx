import React from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { HomeSection } from "@/components/Section/HomeSection";

export default function EntrancePage() {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 4 }}>
          <HomeSection />
        </Stack>
      </Container>

      <ScrollToTopButton />
    </>
  );
}
