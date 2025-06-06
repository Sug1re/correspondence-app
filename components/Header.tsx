"use client";

import * as React from "react";
import Link from "next/link";
import * as Component from "@/components/index";
import * as Icon from "@/icons/index";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <>
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
          {/* タイトル */}
          <Box sx={{ flexGrow: 8, textAlign: "center" }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                color: "#FFFFFF",
              }}
            >
              通信制高校検索アプリ
              <br />
              （新潟県版）
            </Typography>
          </Box>

          {/* お気に入り閲覧ボタン */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <IconButton
              edge="start"
              sx={{ color: "#FFFFFF" }}
              aria-label="menu"
              component={Link}
              href="/favorites"
            >
              <Icon.BookmarkIcon />
            </IconButton>
          </Box>

          {/* ホームボタン */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
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

          {/* ログインボタン */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Component.Login />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
