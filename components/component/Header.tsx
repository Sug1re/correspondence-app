import * as React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <AppBar
        position="relative"
        sx={{
          background: "linear-gradient(to right, #003399, #FF6600)",
        }}
      >
        <Toolbar
          // ヘッダーのテキストを垂直方向に中央寄せ
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* ホームアイコン */}
          <IconButton
            edge="start"
            sx={{
              color: "#FFFFFF",
            }}
            aria-label="menu"
            component={Link}
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </IconButton>

          {/* タイトル */}
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              color: "#FFFFFF",
            }}
            variant="h6"
            component="div"
          >
            通信制高校マッチングアプリ
            <br />
            （新潟県版）
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
