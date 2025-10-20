"use client";

import React from "react";
import { Drawer, List, Box, ListItemButton, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useToastContext } from "@/context/ToastContext";
import { signOut } from "firebase/auth";

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

export default function SideBar({ open, onClose }: SideBarProps) {
  const [user] = useAuthState(auth);
  const { showToast } = useToastContext();

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
      <List sx={{ width: "100%" }}>
        <ListItemButton
          sx={{
            borderRadius: 2,
            mx: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 51, 153, 0.1)",
            },
          }}
          onClick={onClose}
          component="a"
          href="/"
        >
          <HomeIcon sx={{ marginRight: 2 }} />
          <ListItemText
            primary="ホーム"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton>
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
