import React from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumbs";
import { DefaultSection } from "@/components/Sections/DefaultSection";

export default function TransferPage() {
  return (
    <>
      <Header />

      <Breadcrumb />

      <Container maxWidth="md">
        <Stack spacing={2}>
          <DefaultSection admissionType="transfer" />
        </Stack>
      </Container>
    </>
  );
}
