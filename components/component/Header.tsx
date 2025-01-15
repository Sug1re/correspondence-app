import {
  AppBar,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import * as React from "react";

export default function Header() {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
            component={Link}
            href="/"
          >
            通信制高校検索サイト(新潟県版)
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
