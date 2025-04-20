import React from "react";
import * as Component from "@/components/index";
import { Container, Typography } from "@mui/material";

const FavoritePage = () => {
  return (
    <>
      <Component.Header />

      <Container maxWidth="lg">
        {/* ページネーションボタン */}

        <Typography>ユーザーごとのお気に入りのSchoolCardListを表示</Typography>

        <Component.ScrollTopButton />
      </Container>
    </>
  );
};

export default FavoritePage;
