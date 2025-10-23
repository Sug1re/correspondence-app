"use client";

import * as React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import SideBar from "./Bars/SideBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDisclosure } from "@mantine/hooks";
import { useToastContext } from "@/context/ToastContext";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { HEADER_HEIGHT } from "@/lib/constants";
import { useRouter } from "next/navigation";

import MenuIcon from "@mui/icons-material/Menu";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

export default function Header() {
  const [isOpen, handlers] = useDisclosure(false);
  const [loading, setLoading] = React.useState(false);
  const [user] = useAuthState(auth);
  const { showToast } = useToastContext();
  const router = useRouter();

  const onBookmarks = () => {
    router.push("/bookmarks");
  };

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
          height: HEADER_HEIGHT,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100%",
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
              onClick={onBookmarks}
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
// あとで
// Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:
