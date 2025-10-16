"use client";

import React from "react";
import { Drawer, List, Box } from "@mui/material";

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

export default function SideBar({ open, onClose }: SideBarProps) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="temporary"
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#3a3a3aff",
          width: 240,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      {/* 上側のリスト */}
      <List></List>

      <Box flexGrow={1} />
    </Drawer>
  );
}
