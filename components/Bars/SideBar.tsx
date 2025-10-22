"use client";

import React from "react";
import { Drawer, List, Box, ListItemButton, ListItemText } from "@mui/material";

import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useToastContext } from "@/context/ToastContext";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";

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
          onClick={() => {
            onClose(), onHome();
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
            onClose(), onEntrance();
          }}
        >
          <LooksOneIcon sx={{ marginRight: 2 }} />
          <ListItemText
            primary="入学者希望向け"
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
            onClose(), onTransfer();
          }}
        >
          <LooksTwoIcon sx={{ marginRight: 2 }} />
          <ListItemText
            primary="転入者希望向け"
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
