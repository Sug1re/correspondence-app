import React from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumbs";
import { MapSection } from "@/components/Sections/MapSection";

export default function CampusPage() {
  return (
    <>
      <Header />

      <Breadcrumb />

      <Container maxWidth="md">
        <Stack
          spacing={4}
          sx={{
            display: "flex",
            height: 450,
            justifyContent: "center",
          }}
        >
          <MapSection />
        </Stack>
      </Container>
    </>
  );
}
