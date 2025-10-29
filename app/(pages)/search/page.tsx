import React, { Suspense } from "react";
import { Box, CircularProgress, Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { SearchSection } from "@/components/Sections/SearchSection";

export default function SearchPage() {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 4 }}>
          <Suspense
            fallback={
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            }
          >
            <SearchSection />
          </Suspense>
        </Stack>
      </Container>

      <ScrollToTopButton />
    </>
  );
}
