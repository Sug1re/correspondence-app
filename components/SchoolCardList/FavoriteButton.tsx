// components/FavoriteButton.tsx
"use client";

import React from "react";
import { auth } from "@/firebase";
import { toggleFavoriteSchool } from "@/lib/firebase/toggleUid";
import { useAuthState } from "react-firebase-hooks/auth";
import { Snackbar, Alert, Box } from "@mui/material";
import * as Icon from "@/icons/index";

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
      {/* お気に入り登録ボタン */}
      <Box sx={{ position: "absolute", top: 5, right: 5 }}>
        <Icon.BookmarkIcon
          filled={liked}
          fillColor="#FF6611"
          onClick={handleToggle}
          sx={{
            transition: "all 1s ease",
            color: "#FF6611",
            cursor: "pointer",
          }}
        />
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
