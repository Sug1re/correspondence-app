import React from "react";
import { IconButton } from "@mui/material";
import { useDisclosure } from "@mantine/hooks";
import { useToastContext } from "@/context/ToastContext";
import { getAuth } from "firebase/auth";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export const BookmarkButton = () => {
  const [isBookmarked, { toggle }] = useDisclosure(false);
  const { showToast } = useToastContext();
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <>
      <IconButton
        onClick={() => {
          if (!user) {
            showToast("ログインが必要です。");
            return;
          }

          toggle();

          if (!isBookmarked) {
            showToast("お気に入りに追加しました！");
          } else {
            showToast("お気に入りから削除しました！");
          }
        }}
        sx={{
          color: "#D72638",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        disableRipple
      >
        {isBookmarked ? (
          <BookmarkIcon style={{ fontSize: 36, color: "#D72638" }} />
        ) : (
          <BookmarkBorderIcon style={{ fontSize: 36, color: "#808080" }} />
        )}
      </IconButton>
    </>
  );
};
