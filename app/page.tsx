"use client";

import React, { useState } from "react";
import { Container, Stack } from "@mui/material";
import { SchoolCard } from "@/components/Cards/SchoolCard";
import SearchBar from "@/components/Bars/SearchBar";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { PaginationButton } from "@/components/Buttons/PaginationButton";
import { useSchools } from "@/hooks/useSchools";

const ITEMS_PER_PAGE = 4;

export default function Home() {
  const { schools = [] } = useSchools();
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const partSchools = schools.slice(startIndex, endIndex);
  const totalPages = Math.ceil(schools.length / ITEMS_PER_PAGE);
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 4 }}>
          <SearchBar />

          <PaginationButton
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />

          <SchoolCard school={partSchools} />
        </Stack>
      </Container>

      <ScrollToTopButton />
    </>
  );
}
