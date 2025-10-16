"use client";

import * as React from "react";
import Link from "next/link";
import * as Component from "@/components/index";
import * as Icon from "@/icons/index";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import SideBar from "./Bars/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
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
              disableRipple
            >
              <BookmarksIcon style={{ fontSize: 28 }} />
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
              disableRipple
            >
              <Icon.HomeIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <IconButton
              edge="start"
              sx={{ color: "#FFFFFF" }}
              aria-label="menu"
              onClick={toggleDrawer(true)}
              disableRipple
            >
              <MenuIcon style={{ fontSize: 28 }} />
            </IconButton>
          </Box>

          {/* ログインボタン */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Component.Login />
          </Box>
        </Toolbar>
      </AppBar>

      <SideBar open={drawerOpen} onClose={toggleDrawer(false)} />
    </>
  );
}
