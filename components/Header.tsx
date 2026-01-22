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
import { XsWrapper } from "@/components/Wrapper/xsWrapper";
import { Conditional } from "./Wrapper/conditionalWrapper";

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
        position="fixed"
        sx={{
          background: "#FFFFFF",
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
          {/* 雑務:フォントの変更*/}
          <Box sx={{ flexGrow: 8, textAlign: "center" }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: 14, sm: 20 },
                color: "#060666ff",
              }}
            >
              N高等学校・S高等学校・R高等学校
            </Typography>
          </Box>

          {/* 雑務:アイコンとテキストの配置*/}

          <XsWrapper when={false}>
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
                sx={{ color: "#060666ff", gap: 1 }}
                onClick={onBookmarks}
                disableRipple
              >
                <BookmarksIcon style={{ fontSize: 28 }} />
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#060666ff",
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                  }}
                >
                  ブックマーク一覧
                </Typography>
              </IconButton>
            </Box>
          </XsWrapper>

          <Conditional when={!user}>
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
                sx={{ color: "#060666ff", gap: 1 }}
                onClick={login}
                disabled={loading}
                disableRipple
              >
                <AccountCircleIcon style={{ fontSize: 28 }} />
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#060666ff",
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                  }}
                >
                  ログイン
                </Typography>
              </IconButton>
            </Box>
          </Conditional>

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
              sx={{ color: "#060666ff", gap: 1 }}
              onClick={handlers.open}
              disableRipple
            >
              <MenuIcon style={{ fontSize: 28 }} />
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#060666ff",
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
