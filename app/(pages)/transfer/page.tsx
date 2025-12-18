import React from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { DefaultSection } from "@/components/Sections/DefaultSection";
import FooterWrapper from "@/components/Wrapper/xsWrapper";

export default function TransferPage() {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 12 }}>
          <DefaultSection target="transfer" />
        </Stack>
      </Container>

      <ScrollToTopButton />

      <FooterWrapper />
    </>
  );
}
