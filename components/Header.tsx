"use client";

import * as React from "react";
import Link from "next/link";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import SideBar from "./Bars/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDisclosure } from "@mantine/hooks";
import { useToastContext } from "@/context/ToastContext";
import { auth, provider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Header() {
  const [isOpen, handlers] = useDisclosure(false);
  const [loading, setLoading] = React.useState(false);
  const [user] = useAuthState(auth);
  const { showToast } = useToastContext();

  const login = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      showToast("ログインに成功しました");
    } catch {
      showToast("ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  };

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
            }}
          >
            <IconButton
              edge="start"
              sx={{ color: "#FFFFFF", gap: 1 }}
              aria-label="bookmarks"
              component={Link}
              href="/bookmarks"
              disableRipple
            >
              <BookmarksIcon style={{ fontSize: 28 }} />
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
            </IconButton>
          </Box>

          {!user && (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                edge="start"
                sx={{ color: "#FFFFFF", gap: 1 }}
                aria-label="login"
                onClick={login}
                disabled={loading}
                disableRipple
              >
                <AccountCircleIcon style={{ fontSize: 28 }} />
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#FFFFFF",
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                  }}
                >
                  ログイン
                </Typography>
              </IconButton>
            </Box>
          )}

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              edge="start"
              sx={{ color: "#FFFFFF", gap: 1 }}
              aria-label="menu"
              onClick={handlers.open}
              disableRipple
            >
              <MenuIcon style={{ fontSize: 28 }} />
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
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <SideBar open={isOpen} onClose={handlers.close} />
    </>
  );
}
