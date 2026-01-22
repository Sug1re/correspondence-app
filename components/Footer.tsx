"use client";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import MapIcon from "@mui/icons-material/Map";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Footer() {
  const router = useRouter();

  const onCampus = () => {
    router.push("/campus");
  };

  const onBookmarks = () => {
    router.push("/bookmarks");
  };

  const onEstimate = () => {
    router.push("/estimate");
  };

  const partition = {
    content: '""',
    position: "absolute",
    right: 0,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    height: "60%",
    width: "2px",
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
              flex: "1 1 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <IconButton
              sx={{
                color: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
              onClick={onCampus}
              disableRipple
            >
              <MapIcon style={{ fontSize: 28 }} />
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 12,
                }}
              >
                キャンパスを探す
              </Typography>
            </IconButton>
          </Box>

          <Box
            sx={{
              position: "relative",
              width: "2px",
              alignSelf: "stretch",
              "&::after": partition,
            }}
          />

          <Box
            sx={{
              my: 1,
              flex: "1 1 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <IconButton
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
                  fontSize: 12,
                }}
              >
                ブックマーク一覧
              </Typography>
            </IconButton>
          </Box>

          <Box
            sx={{
              position: "relative",
              width: "2px",
              alignSelf: "stretch",
              "&::after": partition,
            }}
          />

          <Box
            sx={{
              my: 1,
              flex: "1 1 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{
                color: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
              onClick={onEstimate}
              disableRipple
            >
              <CheckCircleOutlineIcon style={{ fontSize: 28 }} />
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 12,
                }}
              >
                見積もり
              </Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
