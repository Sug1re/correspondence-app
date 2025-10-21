import React from "react";
import { Container, Stack } from "@mui/material";
import SearchBar from "@/components/Bars/SearchBar";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";

export const SearchPage = () => {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 4 }}>
          <SearchBar />
        </Stack>
      </Container>

      <ScrollToTopButton />
    </>
  );
};
