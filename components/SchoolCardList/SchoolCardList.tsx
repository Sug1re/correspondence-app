"use client";

import React, { useEffect, useState } from "react";
import { Card, Grid } from "@mui/material";
import { School } from "@/app/types/school";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import * as SchoolCard from "@/components/SchoolCardList/index";

type SchoolCardListProps = {
  schools: School[];
};

const SchoolCardList: React.FC<SchoolCardListProps> = ({ schools }) => {
  const [user] = useAuthState(auth);

  const [likedSchools, setLikedSchools] = useState<Record<string, boolean>>({});

  const setLiked = (schoolId: string, liked: boolean) => {
    setLikedSchools((prev) => ({
      ...prev,
      [schoolId]: liked,
    }));
  };

  //  ログインユーザーのお気に入りを取得して state にセット
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setLikedSchools({});
        return;
      }

      const favoritesRef = collection(db, "users", user.uid, "favorites");
      const snapshot = await getDocs(favoritesRef);

      const initialLikedState: Record<string, boolean> = {};
      snapshot.forEach((doc) => {
        initialLikedState[doc.id] = true;
      });

      setLikedSchools(initialLikedState);
    };

    fetchFavorites();
  }, [user]);

  return (
    <>
      <Grid container spacing={2} columns={{ sm: 4, md: 8 }} sx={{ pt: 2 }}>
        {schools.map((school) => (
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
              <SchoolCard.FavoriteButton
                schoolId={school.id}
                liked={!!likedSchools[school.id]}
                setLiked={setLiked}
              />

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
  );
};

export default SchoolCardList;
