"use client";

import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { useToastContext } from "@/context/ToastContext";
import { getAuth } from "firebase/auth";
import { addBookmark, isBookmarked, removeBookmark } from "@/lib/bookmark";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

interface Props {
  schoolId: string;
}

export const BookmarkButton = ({ schoolId }: Props) => {
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);
  const { showToast } = useToastContext();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchStatus = async () => {
      if (!user) return;
      const status = await isBookmarked(schoolId);
      setIsBookmarkedState(status);
    };
    fetchStatus();
  }, [user, schoolId]);

  const handleClick = async () => {
    if (!user) {
      showToast("ログインが必要です。");
      return;
    }

    try {
      if (isBookmarkedState) {
        await removeBookmark(schoolId);
        setIsBookmarkedState(false);
        showToast("お気に入りから削除しました！");
      } else {
        await addBookmark(schoolId);
        setIsBookmarkedState(true);
        showToast("お気に入りに追加しました！");
      }
    } catch (err) {
      showToast("操作中にエラーが発生しました。");
      console.error(err);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          color: isBookmarkedState ? "#D72638" : "#808080",
          backgroundColor: "transparent",
          "&:hover": { backgroundColor: "transparent" },
        }}
        disableRipple
      >
        {isBookmarkedState ? (
          <BookmarkIcon style={{ fontSize: 36, color: "#D72638" }} />
        ) : (
          <BookmarkBorderIcon style={{ fontSize: 36 }} />
        )}
      </IconButton>
    </>
  );
};
