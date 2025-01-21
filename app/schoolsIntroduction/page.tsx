import React from "react";
import { Box, Typography } from "@mui/material";
import * as Component from "@/components/component";

// // Nissy がここに学校の詳細ページをコーディング
export default function schoolsIntroductionPage() {
  return (
    <>
      <Component.Header />

      <Box sx={{ p: "20px 10%", bgcolor: "cornflowerblue" }}>
        {/* 見出し */}
        <Typography variant="h2" sx={{ fontWeight: 600, fontSize: "2.5rem" }}>
          N高等学校
        </Typography>
      </Box>
      <Box sx={{ p: 0, width: "70%", m: "10px auto" }}>
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
            <Typography
              sx={{
                ml: "5px",
                p: "5px 20px",
                border: "solid 1px #ccc",
                borderRadius: "4px",
              }}
            >
              IT
            </Typography>
            <Typography
              sx={{
                ml: "5px",
                p: "5px 20px",
                border: "solid 1px #ccc",
                borderRadius: "4px",
              }}
            >
              声優
            </Typography>
            <Typography
              sx={{
                ml: "5px",
                p: "5px 20px",
                border: "solid 1px #ccc",
                borderRadius: "4px",
              }}
            >
              語学
            </Typography>
          </Box>
          {/* 通学 */}
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontSize: "1.4rem" }}
          >
            通学
          </Typography>
          <Box sx={{ display: "flex", p: "5px" }}>
            <Typography
              sx={{
                ml: "5px",
                p: "5px 20px",
                border: "solid 1px #ccc",
                borderRadius: "4px",
              }}
            >
              週5日
            </Typography>
            <Typography
              sx={{
                ml: "5px",
                p: "5px 20px",
                border: "solid 1px #ccc",
                borderRadius: "4px",
              }}
            >
              週3日
            </Typography>
            <Typography
              sx={{
                ml: "5px",
                p: "5px 20px",
                border: "solid 1px #ccc",
                borderRadius: "4px",
              }}
            >
              週1日
            </Typography>
            <Typography
              sx={{
                ml: "5px",
                p: "5px 20px",
                border: "solid 1px #ccc",
                borderRadius: "4px",
              }}
            >
              プログラミングコース
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
