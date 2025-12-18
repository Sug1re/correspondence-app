import React, { Suspense } from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { SearchSection } from "@/components/Sections/SearchSection";
import { Loading } from "@/components/Loading";
import FooterWrapper from "@/components/Wrapper/xsWrapper";

export default function SearchPage() {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 12 }}>
          <Suspense fallback={<Loading />}>
            <SearchSection />
          </Suspense>
        </Stack>
      </Container>

      <ScrollToTopButton />

      <FooterWrapper />
    </>
  );
}
