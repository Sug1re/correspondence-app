import React from "react";
import { Box, Container } from "@mui/material";
import * as Component from "@/components/index";

export default async function Home() {
  return (
    <>
      {/* エラー内容 */}
      {/* FirebaseError: Firebase: Error (auth/popup-closed-by-user).
    at createErrorInternal (webpack-internal:///(app-pages-browser)/./node_modules/firebase/node_modules/@firebase/auth/dist/esm2017/index-c92d61ad.js:622:41)
    at _createError (webpack-internal:///(app-pages-browser)/./node_modules/firebase/node_modules/@firebase/auth/dist/esm2017/index-c92d61ad.js:593:12)
    at eval (webpack-internal:///(app-pages-browser)/./node_modules/firebase/node_modules/@firebase/auth/dist/esm2017/index-c92d61ad.js:9721:33) */}

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
          <Component.Home />
        </Box>

        <Component.ScrollTopButton />
      </Container>
    </>
  );
}
