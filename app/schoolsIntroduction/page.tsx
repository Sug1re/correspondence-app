import React from "react";
import { Box, ThemeProvider, Typography } from "@mui/material";
import * as Component from "@/components/component";
import InfoItem from "@/components/component/InfoItem";

// // Nissy がここに学校の詳細ページをコーディング
export default function schoolsIntroductionPage() {
  return (
    <>
      
      <Component.Header />

      <Box sx={{ p: "20px 0", color: "#333"}}>
        {/* 見出し */}
        <Typography variant="h2" sx={{ 
          fontWeight: 600, 
          fontSize: "2.5rem",
          display: "block", 
          borderBottom: "solid 4px #6495ed",
          padding: "4px 10%",
        }}>
          N高等学校
        </Typography>
      </Box>
      <Box sx={{ 
        p: 0, width: "70%", 
        m: "10px auto", 
      }}>
        {/* メイン */}
        {/* 説明と画像 */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ width: "48%" }}>
            {" "}
            {/* 画像欄 */}
            <Typography
              sx={{ width: "100%", height: "200px", bgcolor: "gray" }}
            >
              ここに画像
            </Typography>
          </Box>
          <Box sx={{ width: "48%", pl: "10px", borderLeft: "solid 1px #ccc" }}>
            {/* 説明欄 */}
            <Typography>沖縄に本校があるよん</Typography>
          </Box>
        </Box>
        {/* スローガン(正味いらんかも) */}
        <Box sx={{ backgroundColor: "crimson", margin: "5px", padding: "3px"}}>
          <Typography variant="h1"
            sx={{
              color: "white",
              fontSize: "35px",
              textAlign: "center",
              fontWeight: "600"
            }}
          >
            2+2 = 5
          </Typography>
        </Box>
        {/* 詳細 */}
        <Box sx={{ m: "5px" }}>
          <Typography
            variant="h3"
            sx={{
              m: "10px",
              textAlign: "center",
              fontSize: "1.8rem",
              borderBottom: "solid 4px cornflowerblue",
            }}
          >
            概要
          </Typography>
          <Typography 
            variant="h4"
            sx={{
              ml: "30px",
              fontSize: "25px",
              borderLeft: "solid 4px crimson"
            }}
          >
            授業形態
          </Typography>
          <Box sx={{ ml: "50px" }}>
            <Typography variant="p" sx={{ display: "block", fontSize: "22px" }}>
              スクーリング：(ここに展開)
            </Typography>
            <Typography variant="p" sx={{ display: "block", fontSize: "22px" }}>
              授業での県外移動：(ここに展開)
            </Typography>
            <Typography variant="p" sx={{ display: "block", fontSize: "22px" }}>
              通学形態：(ここに展開)
            </Typography>
          </Box>
          {/* 費用 */}
          <Typography 
            variant="h4"
            sx={{
              ml: "30px",
              fontSize: "25px",
              borderLeft: "solid 4px crimson"
            }}
          >
            費用
          </Typography>
          <Box sx={{ ml: "50px" }}>
            <Typography variant="p" sx={{ display: "block", fontSize: "22px" }}>
              初期費用：(ここに展開)
            </Typography>
            <Typography variant="p" sx={{ display: "block", fontSize: "22px" }}>
              受験料：(ここに展開)
            </Typography>
            <Typography variant="p" sx={{ display: "block", fontSize: "22px" }}>
              授業料：(ここに展開)
            </Typography>
          </Box>
        </Box>
        {/* 詳細 */}
        <Box sx={{ m: "5px" }}>
          <Typography
            variant="h3"
            sx={{
              m: "10px",
              textAlign: "center",
              fontSize: "1.8rem",
              borderBottom: "solid 4px cornflowerblue",
            }}
          >
            詳細
          </Typography>
          {/* 強み */}
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontSize: "1.4rem" }}
          >
            強み
          </Typography>
          <Box sx={{ display: "flex", p: "5px" }}>
            <InfoItem text="IT" />
            <InfoItem text="声優" />
            <InfoItem text="語学" />
          </Box>
          {/* コース */}
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontSize: "1.4rem" }}
          >
            コース
          </Typography>
          <Box sx={{ display: "flex", p: "5px" }}>
            <InfoItem text="通学コース" />
            <InfoItem text="プログラミングコース(一部キャンパスのみ)" />
          </Box>
          {/* 登校頻度 */}
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontSize: "1.4rem" }}
          >
            通学
          </Typography>
          <Box sx={{ display: "flex", p: "5px" }}>
            <InfoItem text="週１" />
            <InfoItem text="週３" />
            <InfoItem text="週５" />
          </Box>
        </Box>
      </Box>
    </>
  );
}
