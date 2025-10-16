"use client";

import React from "react";
import { auth } from "@/firebase";
import { toggleFavoriteSchool } from "@/lib/firebase/toggleUid";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, IconButton } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useToastContext } from "@/context/ToastContext";

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
  const { showToast } = useToastContext();

  const handleToggle = async () => {
    if (!user) {
      showToast("お気に入り登録にはログインが必要です", "error");
      return;
    }

    const updatedLike = !liked;
    setLiked(schoolId, updatedLike);
    await toggleFavoriteSchool(user.uid, schoolId, updatedLike);

    showToast(
      updatedLike ? "お気に入りに登録しました" : "お気に入りから削除しました",
      "success"
    );
  };

  return (
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
  );
};

export default FavoriteButton;
