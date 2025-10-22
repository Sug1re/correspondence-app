import React from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { SearchSection } from "@/components/Section/SearchSection";

export default function SearchPage() {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 4 }}>
          <SearchSection />
        </Stack>
      </Container>

      <ScrollToTopButton />
    </>
  );
}
