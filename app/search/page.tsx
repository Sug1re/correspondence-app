"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
} from "@mui/material";

type School = {
  name: string;
  tuition: number;
};

const SearchResultPage = () => {
  const searchParams = useSearchParams();
  const tuitionParam = searchParams.get("tuition");
  const [schoolsData, setSchoolsData] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const snapshot = await getDocs(collection(db, "schools"));
        const allSchools = snapshot.docs.map((doc) => doc.data() as School);

        const filteredSchools = allSchools.filter((school) => {
          return (
            school.tuition <= (tuitionParam ? parseInt(tuitionParam) : 200)
          );
        });

        setSchoolsData(filteredSchools);
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [tuitionParam]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          検索結果
        </Typography>
        {loading ? (
          <Typography variant="body1">読み込み中...</Typography>
        ) : schoolsData.length > 0 ? (
          schoolsData.map((school, index) => (
            <Card key={index} sx={{ my: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {school.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  学費:年間約{school.tuition}万円
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">詳細を見る</Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="body1">
            条件に一致する学校が見つかりませんでした。
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default SearchResultPage;
