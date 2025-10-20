import React from "react";
import { SchoolCard } from "@/components/Cards/SchoolCard";
import SearchBar from "@/components/Bars/SearchBar";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <SearchBar />

        <SchoolCard />
      </Container>

      <ScrollToTopButton />
    </>
  );
}
