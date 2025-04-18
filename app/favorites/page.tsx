import React from "react";
import * as Component from "@/components/index";
import { Container } from "@mui/material";

const FavoritePage = () => {
  return (
    <>
      <Component.Header />

      <Container maxWidth="lg">
        <Component.ScrollTopButton />
      </Container>
    </>
  );
};

export default FavoritePage;
