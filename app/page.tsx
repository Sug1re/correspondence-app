import React from "react";
import { Box, Container } from "@mui/material";
import * as Component from "@/components/index";

export default async function Home() {
  return (
    <>
      <Component.Header />

      <Component.SearchBar />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex-col",
            justifyContent: "center", // 水平中央
            alignItems: "center", // 垂直中央
            height: "100vh", // 画面全体の高さ
          }}
        >
          <Component.AllSchoolCard />
        </Box>

        <Component.Footer />
      </Container>
    </>
  );
}
