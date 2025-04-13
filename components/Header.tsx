import * as React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import Login from "./Login";

export default function Header() {
  return (
    <>
      {/* レスポンシブ対応にする */}

      <AppBar
        position="relative"
        sx={{
          background: "linear-gradient(to right, #003399, #FF6600)", // グラデーション
        }}
      >
        <Toolbar
          // デフォルトの間隔を無効化
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* ホームボタン */}
          <Box sx={{ flexGrow: 3, display: "flex", justifyContent: "center" }}>
            <IconButton
              edge="start"
              sx={{ color: "#FFFFFF" }}
              aria-label="menu"
              component={Link}
              href="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ width: "28px", height: "28px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </IconButton>
          </Box>

          {/* タイトル */}
          <Box sx={{ flexGrow: 8, textAlign: "center" }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                color: "#FFFFFF",
              }}
            >
              通信制高校マッチングアプリ
              <br />
              （新潟県版）
            </Typography>
          </Box>

          {/* ログインボタン */}
          <Box sx={{ flexGrow: 3, display: "flex", justifyContent: "center" }}>
            <Login />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
