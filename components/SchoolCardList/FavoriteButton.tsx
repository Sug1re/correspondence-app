"use client";

import React from "react";
import { auth } from "@/firebase";
import { toggleFavoriteSchool } from "@/lib/firebase/toggleUid";
import { useAuthState } from "react-firebase-hooks/auth";
import { Snackbar, Alert, Box, IconButton } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

type FavoriteButtonProps = {
  schoolId: string;
  liked: boolean;
  setLiked: (schoolId: string, liked: boolean) => void;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  schoolId,
  liked,
  setLiked,
}) => {
  const [user] = useAuthState(auth);
  const [errorOpen, setErrorOpen] = React.useState(false);

  // ブックマーク切り替え処理
  const handleToggle = async () => {
    if (!user) {
      setErrorOpen(true);
      return;
    }

    const updatedLike = !liked;
    setLiked(schoolId, updatedLike);
    await toggleFavoriteSchool(user.uid, schoolId, updatedLike);
  };

  return (
    <>
      {/* ブックマークボタン */}
      <Box sx={{ position: "absolute", top: 0.5, right: 0.5 }}>
        <IconButton
          onClick={handleToggle}
          sx={{ color: "#FF6611" }}
          disableRipple
        >
          {liked ? (
            <BookmarkIcon style={{ fontSize: 30 }} />
          ) : (
            <BookmarkBorderIcon style={{ fontSize: 30 }} />
          )}
        </IconButton>
      </Box>

      {/* アラート */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
        >
          お気に入り登録にはログインが必要です
        </Alert>
      </Snackbar>
    </>
  );
};

export default FavoriteButton;
