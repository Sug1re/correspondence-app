"use client";

import * as React from "react";
import Link from "next/link";
import * as Component from "@/components/index";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import SideBar from "./Bars/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { useDisclosure } from "@mantine/hooks";

export default function Header() {
  const [isOpen, handlers] = useDisclosure(false);

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          background: "linear-gradient(to right, #003399, #FF6600)",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
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

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
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

            <Typography
              sx={{
                fontWeight: 600,
                color: "#FFFFFF",
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
              }}
            >
              ブックマーク
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              edge="start"
              sx={{ color: "#FFFFFF" }}
              aria-label="menu"
              onClick={handlers.open}
              disableRipple
            >
              <MenuIcon style={{ fontSize: 28 }} />
            </IconButton>

            <Typography
              sx={{
                fontWeight: 600,
                color: "#FFFFFF",
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
              }}
            >
              メニュー
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Component.Login />
          </Box>
        </Toolbar>
      </AppBar>

      <SideBar open={isOpen} onClose={handlers.close} />
    </>
  );
}
