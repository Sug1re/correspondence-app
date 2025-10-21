import React from "react";
import { Container, Stack } from "@mui/material";
import { SchoolCard } from "@/components/Cards/SchoolCard";
import SearchBar from "@/components/Bars/SearchBar";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { PaginationButton } from "@/components/Buttons/PaginationButton";

export default function Home() {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 4 }}>
          <SearchBar />

          <PaginationButton />

          <SchoolCard />
        </Stack>
      </Container>

      <ScrollToTopButton />
    </>
  );
}
