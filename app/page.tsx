import React from "react";
import { Container, Stack } from "@mui/material";
import SearchBar from "@/components/Bars/SearchBar";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { SchoolSection } from "@/components/Section/SchoolSection";

export default function Home() {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 4 }}>
          <SearchBar />

          <SchoolSection />
        </Stack>
      </Container>

      <ScrollToTopButton />
    </>
  );
}
