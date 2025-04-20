"use client";

import React, { useEffect, useState } from "react";
import * as Component from "@/components/index";
import * as Icon from "@/icons/index";
import { useAuthContext } from "../context/AuthContext";
import { Box, Card, Container, Typography } from "@mui/material";
import { School } from "@/app/types/school";
import { getAllFirestoreData } from "@/lib/firebase/getAllFirestoreData"; // この関数は既にある前提
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

const FavoritePage = () => {
  const { user } = useAuthContext();
  const [favoriteSchoolIds, setFavoriteSchoolIds] = useState<string[]>([]);
  const [favoriteSchools, setFavoriteSchools] = useState<School[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // ユーザーのお気に入り schoolId を取得
        const favoritesSnapshot = await getDocs(
          collection(db, "users", user.uid, "favorites")
        );
        const ids = favoritesSnapshot.docs.map((doc) => doc.id);
        setFavoriteSchoolIds(ids);

        // 全学校データを取得してフィルタリング
        const allSchools = await getAllFirestoreData();
        const filtered = allSchools.filter((school) => ids.includes(school.id));
        setFavoriteSchools(filtered);
      } catch (error) {
        console.error("お気に入り学校の取得に失敗しました", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      <Component.Header />

      <Container maxWidth="lg">
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

        {/* 表示部分 */}
        {favoriteSchools.length === 0 ? (
          <Typography sx={{ mt: 2 }}>お気に入りの学校はありません。</Typography>
        ) : (
          favoriteSchools.map((school) => (
            <Card key={school.id} sx={{ my: 1, p: 2 }}>
              <Typography variant="h6">{school.name}</Typography>
              <Typography variant="body2">コース: {school.course}</Typography>
              <Typography variant="body2">
                学費: ¥{school.totalTuitionFee.toLocaleString()}
              </Typography>
              {/* 必要に応じて他の情報も追加 */}
            </Card>
          ))
        )}

        <Component.ScrollTopButton />
      </Container>
    </>
  );
};

export default FavoritePage;
