import React from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumbs";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";

export default function EstimatePage() {
  return (
    <>
      <Header />

      <Breadcrumb />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 4 }}></Stack>
      </Container>

      <ScrollToTopButton />
    </>
  );
}
