"use client";

import React from "react";
import { Drawer, List, Box, ListItemButton, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

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
        <ListItemButton onClick={onClose} component="a" href="/">
          <HomeIcon sx={{ marginRight: 2 }} />
          <ListItemText
            primary="ホーム"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton>
      </List>

      <Box flexGrow={1} />
    </Drawer>
  );
}
