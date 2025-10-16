"use client";

import React, { useEffect, useState } from "react";
import * as Component from "@/components/index";
import * as SchoolCard from "@/components/SchoolCardList/index";
import * as CustomHook from "@/hooks/index";
import { useAuthContext } from "../context/AuthContext";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { School } from "@/app/types/school";
import { getAllFirestoreData } from "@/lib/firebase/getAllFirestoreData"; // この関数は既にある前提
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

import ListIcon from "@mui/icons-material/List";

const FavoritePage = () => {
  const { user } = useAuthContext();
  const [favoriteSchools, setFavoriteSchools] = useState<School[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setFavoriteSchools([]); // ユーザーがログアウトしている場合、空の配列にする
        return;
      }

      try {
        // ユーザーのお気に入り schoolId を取得
        const favoritesSnapshot = await getDocs(
          collection(db, "users", user.uid, "favorites")
        );
        const ids = favoritesSnapshot.docs.map((doc) => doc.id);

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

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    handleNextPage,
    handlePrevPage,
  } = CustomHook.usePagination(favoriteSchools.length);

  const currentFavoriteSchools = favoriteSchools.slice(startIndex, endIndex);

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
          <Box>
            <Typography
              sx={{
                minWidth: "100%",
                justifyContent: "flex-start",
                color: "#003399",
                fontWeight: 600,
                m: 1,
                gap: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListIcon style={{ fontSize: 28 }} />
              お気に入り学校一覧
            </Typography>
          </Box>
        </Card>

        {/* 表示部分 */}
        {favoriteSchools.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <Typography
              sx={{
                mt: 2,
                fontWeight: 600,
              }}
            >
              お気に入りの学校はありません
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Component.BackButton />

              <Component.PaginationButton
                currentPage={currentPage}
                totalPages={totalPages}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />
            </Box>

            <Grid
              container
              spacing={2}
              columns={{ sm: 4, md: 8 }}
              sx={{ py: 2 }}
            >
              {currentFavoriteSchools.map((school) => (
                <Grid key={school.id} size={2}>
                  <Card
                    sx={{
                      boxShadow: 5,
                      borderRadius: 2,
                      border: `0.5px solid #003399`,
                      width: {
                        xs: 160,
                        sm: 330,
                        md: 280,
                      },
                      position: "relative",
                    }}
                  >
                    <SchoolCard.SchoolImage
                      url={school.url}
                      imgUrl={school.imgUrl}
                      name={school.name}
                    />

                    <SchoolCard.SchoolCardText school={school} />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Component.ScrollTopButton />
      </Container>
    </>
  );
};

export default FavoritePage;
