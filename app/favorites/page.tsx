"use client";

import React, { useEffect, useState } from "react";
import * as Component from "@/components/index";
import * as Icon from "@/icons/index";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuthContext } from "../context/AuthContext";
import { Box, Card, Container, Typography } from "@mui/material";

const FavoritePage = () => {
  const { user } = useAuthContext(); // ログインユーザー情報
  const [favoriteSchoolIds, setFavoriteSchoolIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchFavoriteSchools = async () => {
      if (!user) return;

      const favoritesRef = collection(db, "users", user.uid, "favorites");

      try {
        const snapshot = await getDocs(favoritesRef);
        const ids = snapshot.docs.map((doc) => doc.id); // schoolId は doc.id に保存されている
        setFavoriteSchoolIds(ids);
      } catch (error) {
        console.error("お気に入り学校の取得に失敗しました", error);
      }
    };

    fetchFavoriteSchools();
  }, [user]);
  return (
    <>
      <Component.Header />

      <Container maxWidth="lg">
        {/* 一覧ヘッダー */}
        <Card
          sx={{
            my: 2,
            borderRadius: 2,
            boxShadow: 3,
            border: `0.5px solid #003399`,
          }}
        >
          <Box
            sx={{
              minWidth: "100%",
              justifyContent: "flex-start",
              color: "#003399",
              fontWeight: 600,
              m: 1,
              display: "flex",
            }}
          >
            <Box sx={{ pr: 2 }}>
              <Icon.ListIcon />
            </Box>
            お気に入り学校一覧
          </Box>
        </Card>

        {/* お気に入りの schoolId 一覧 */}
        {favoriteSchoolIds.length === 0 ? (
          <Typography sx={{ mt: 2 }}>お気に入りの学校はありません。</Typography>
        ) : (
          favoriteSchoolIds.map((schoolId) => (
            <Card key={schoolId} sx={{ my: 1, p: 2 }}>
              <Typography>{schoolId}</Typography>
            </Card>
          ))
        )}

        <Component.ScrollTopButton />
      </Container>
    </>
  );
};

export default FavoritePage;
