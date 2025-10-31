"use client";

import React from "react";
import { Drawer, List, Box, ListItemButton, ListItemText } from "@mui/material";

import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useToastContext } from "@/context/ToastContext";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import HomeIcon from "@mui/icons-material/Home";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
// import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

export default function SideBar({ open, onClose }: SideBarProps) {
  const [user] = useAuthState(auth);
  const { showToast } = useToastContext();
  const router = useRouter();

  const onHome = () => {
    router.push("/");
  };

  const onEntrance = () => {
    router.push("/entrance");
  };

  const onTransfer = () => {
    router.push("/transfer");
  };

  const onBookmarks = () => {
    router.push("/bookmarks");
  };

  // const onInquiry = () => {
  //   router.push("/inquiry");
  // };

  const logout = async () => {
    try {
      await signOut(auth);
      showToast("ログアウトしました");
      onClose();
    } catch {
      showToast("ログアウトに失敗しました");
    }
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="temporary"
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#ffffff",
          width: 240,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      <List
        sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}
      >
        <ListItemButton
          sx={{
            borderRadius: 2,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },
          }}
          onClick={() => {
            onHome();
            onClose();
          }}
        >
          <HomeIcon sx={{ marginRight: 2 }} />
          <ListItemText
            primary="ホーム"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            borderRadius: 2,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },
          }}
          onClick={() => {
            onEntrance();
            onClose();
          }}
        >
          <LooksOneIcon sx={{ marginRight: 2 }} />
          <ListItemText
            primary="新入学向け"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            borderRadius: 2,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },
          }}
          onClick={() => {
            onTransfer();
            onClose();
          }}
        >
          <LooksTwoIcon sx={{ marginRight: 2 }} />
          <ListItemText
            primary="転入学向け"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            borderRadius: 2,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },
          }}
          onClick={() => {
            onBookmarks();
            onClose();
          }}
        >
          <BookmarksIcon sx={{ marginRight: 2 }} />
          <ListItemText
            primary="ブックマーク"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton>
        {/* <ListItemButton
          sx={{
            borderRadius: 2,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },
          }}
          onClick={() => {
            onInquiry();
            onClose();
          }}
        >
          <MailIcon sx={{ marginRight: 2 }} />
          <ListItemText
            primary="お問い合わせ"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton> */}
        {user && (
          <ListItemButton
            sx={{
              borderRadius: 2,
              mx: 1,
              "&:hover": {
                backgroundColor: "rgba(0, 51, 153, 0.1)",
              },
            }}
            onClick={logout}
          >
            <LogoutIcon sx={{ marginRight: 2 }} />
            <ListItemText
              primary="ログアウト"
              primaryTypographyProps={{ fontWeight: 600 }}
            />
          </ListItemButton>
        )}
      </List>

      <Box flexGrow={1} />
    </Drawer>
  );
}
