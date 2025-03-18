import React from "react";
import { Box, Container } from "@mui/material";
import * as Component from "@/components/component";

export default async function Home() {
  return (
    <>
      <Component.Header />

      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex-col",
            justifyContent: "center", // 水平中央
            alignItems: "center", // 垂直中央
            height: "100vh", // 画面全体の高さ
          }}
        >
          <Component.SearchBar />
          <Component.SchoolCard />
        </Box>
      </Container>
    </>
  );
}
