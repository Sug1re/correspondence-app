import React from "react";
import { Box, Container, Typography } from "@mui/material";
import * as Component from "@/components/component";
import InfoItem from "@/components/component/InfoItem";

// // Nissy がここに学校の詳細ページをコーディング
export default function schoolsIntroductionPage() {
  return (
    <>
      <Component.Header />

      {/* 学校名 */}
      <Container maxWidth="md">
        <Box sx={{ mt: 2, color: "#333" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              fontSize: "35px",
              display: "block",
              borderBottom: "solid 4px #6495ed",
              padding: "4px 10%",
            }}
          >
            N高等学校
          </Typography>
        </Box>

        {/* 学校情報 */}
        <Box>
          {/* 学費 */}
          <Box>
            <Typography
              variant="h3"
              sx={{
                mt: 2,
                textAlign: "center",
                fontSize: "28px",
                borderBottom: "solid 4px cornflowerblue ",
              }}
            >
              学費
            </Typography>

            {/* 小見出し */}
            {/* <Typography
              variant="h4"
              sx={{
                ml: "30px",
                fontSize: "px",
                borderLeft: "solid 4px crimson",
              }}
            >
              授業形態
            </Typography> */}

            {/* データ表示 */}
            {/* <Box sx={{ ml: "50px" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                }}
              >
                <Typography variant="body1">
                  スクーリング：(ここに展開)
                </Typography>
                <Typography variant="body1">
                  授業での県外移動：(ここに展開)
                </Typography>
                <Typography variant="body1">通学形態：(ここに展開)</Typography>
              </Box>
            </Box> */}

            {/* 小見出し */}
            <Typography
              variant="h3"
              sx={{
                mt: 1,
                ml: 1,
                fontSize: "20px",
                borderLeft: "solid 4px crimson",
              }}
            >
              費用
            </Typography>

            {/* データ表示 */}
            <Box sx={{ ml: "50px" }}>
              <Typography variant="body1" sx={{ fontSize: "20px" }}>
                初期費用：(ここに展開)
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "20px" }}>
                受験料：(ここに展開)
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "20px" }}>
                授業料：(ここに展開)
              </Typography>
            </Box>
          </Box>

          {/* 詳細 */}
          <Box>
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                fontSize: "1.8rem",
                borderBottom: "solid 4px cornflowerblue",
              }}
            >
              詳細
            </Typography>

            {/* 小見出し */}
            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontSize: "1.4rem" }}
            >
              強み
            </Typography>

            {/* コンポーネント */}
            <Box sx={{ display: "flex", p: "5px" }}>
              <InfoItem text="IT" />
              <InfoItem text="声優" />
              <InfoItem text="語学" />
            </Box>

            {/* 小見出し */}
            {/* <Typography
              variant="h4"
              sx={{ textAlign: "center", fontSize: "1.4rem" }}
            >
              コース
            </Typography> */}

            {/* コンポーネント */}
            {/* <Box sx={{ display: "flex", p: "5px" }}>
              <InfoItem text="通学コース" />
              <InfoItem text="プログラミングコース(一部キャンパスのみ)" />
            </Box> */}

            {/* 小見出し */}
            {/* <Typography
              variant="h4"
              sx={{ textAlign: "center", fontSize: "1.4rem" }}
            >
              通学
            </Typography> */}

            {/* コンポーネント */}
            {/* <Box sx={{ display: "flex", p: "5px" }}>
              <InfoItem text="週１" />
              <InfoItem text="週３" />
              <InfoItem text="週５" />
            </Box> */}
          </Box>
        </Box>
      </Container>
    </>
  );
}
