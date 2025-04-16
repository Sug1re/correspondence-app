import * as React from "react";
import Link from "next/link";
import * as Component from "@/components/index";
import * as Icon from "@/components/icons/index";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

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
              <Icon.HomeIcon />
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
            <Component.Login />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
