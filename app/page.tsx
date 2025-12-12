import React from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import { TargetButton } from "@/components/Buttons/TargetButton";

export default function Home() {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 4 }}>
          <TargetButton />
        </Stack>
      </Container>
    </>
  );
}
