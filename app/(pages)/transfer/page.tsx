import React from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { DefaultSection } from "@/components/Section/DefaultSection";

export default function TransferPage() {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 4 }}>
          <DefaultSection target="transfer" />
        </Stack>
      </Container>

      <ScrollToTopButton />
    </>
  );
}
