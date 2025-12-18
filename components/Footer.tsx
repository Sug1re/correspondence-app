"use client";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import MapIcon from "@mui/icons-material/Map";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

export default function Footer() {
  const router = useRouter();

  const onBookmarks = () => {
    router.push("/bookmarks");
  };

  const partition = {
    content: '""',
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    height: "60%",
    width: "1px",
    backgroundColor: "#FFFFFF",
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          background: "#060666ff",
          height: 80,
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
          <Box
            sx={{
              my: 1,
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              "&::after": {
                ...partition,
              },
            }}
          >
            <IconButton
              edge="start"
              sx={{
                color: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
              onClick={() => {}}
              disableRipple
            >
              <MapIcon style={{ fontSize: 28 }} />
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                キャンパスを探す
              </Typography>
            </IconButton>
          </Box>
          <Box
            sx={{
              my: 1,
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              "&::after": {
                ...partition,
              },
            }}
          >
            <IconButton
              edge="start"
              sx={{
                color: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
              onClick={onBookmarks}
              disableRipple
            >
              <BookmarksIcon style={{ fontSize: 28 }} />
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                ブックマーク一覧
              </Typography>
            </IconButton>
          </Box>
          <Box
            sx={{
              my: 1,
              flexGrow: 1,

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              edge="start"
              sx={{
                color: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
              onClick={() => {}}
              disableRipple
            >
              <MapIcon style={{ fontSize: 28 }} />
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                }}
              >
                キャンパスを探す
              </Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
