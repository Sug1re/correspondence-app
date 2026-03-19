"use client";

import React, { useEffect } from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumbs";

import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { DefaultSection } from "@/components/Sections/DefaultSection";

export default function AdmissionPage() {
  useEffect(() => {
    fetch("/api/sheet")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <>
      <Header />

      <Breadcrumb />

      <Container maxWidth="md">
        <Stack spacing={2}>
          <DefaultSection admissionType="admission" />
        </Stack>
      </Container>

      <ScrollToTopButton />
    </>
  );
}
