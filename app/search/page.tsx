import React from "react";
import { Container } from "@mui/material";
import SearchBar from "@/components/Bars/SearchBar";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";

export const SearchPage = () => {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <SearchBar />
      </Container>

      <ScrollToTopButton />
    </>
  );
};
