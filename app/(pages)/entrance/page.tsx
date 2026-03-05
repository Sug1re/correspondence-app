import React from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { XsWrapper } from "@/components/Wrapper/xsWrapper";
import { Breadcrumb } from "@/components/Breadcrumbs";

import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { DefaultSection } from "@/components/Sections/DefaultSection";

export default function EntrancePage() {
  return (
    <>
      <Header />

      <Breadcrumb />

      <Container maxWidth="md">
        <Stack spacing={2}>
          <DefaultSection target="entrance" />
        </Stack>
      </Container>

      <ScrollToTopButton />

      <XsWrapper when={true}>
        <Footer />
      </XsWrapper>
    </>
  );
}
