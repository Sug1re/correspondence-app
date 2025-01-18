//           {/* {schoolsData.length > 0 ? (
//             schoolsData.map((school, index) => (
//               <Card key={index} sx={{ my: 2 }}>
//                 <CardContent>
//                   <Typography variant="h5" component="div">
//                     {school.name}
//                   </Typography>
//                   <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     学費:年間約{school.tuition}万円
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button size="small">詳細を見る</Button>
//                 </CardActions>
//               </Card>
//             ))
//           ) : (
//             <Typography variant="body1">
//               条件に一致する学校が見つかりませんでした。
//             </Typography>
//           )} */}

"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import * as Component from "@/components/component";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

const SearchResultPage = () => {
  const searchParams = useSearchParams();

  //   // クエリパラメータの取得
  const tuitionParams = searchParams.get("tuition"); // クエリパラメータ ”tuition” を獲得
  useEffect(() => {
    const fetchSchools = async () => {
      const schoolRef = collection(db, "schools");
      const q = query(schoolRef, where("tuition", "<=", tuition));
      const snapshot = await getDocs(q);
      const schoolsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(schoolsData);
    };
    fetchSchools();
  }, []);

  // nullチェックしてから、stringをnumberに変換
  const tuition = tuitionParams ? parseInt(tuitionParams) : NaN; // または、デフォルト値を設定することも可能

  return (
    <>
      <Component.Header />

      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            検索結果
          </Typography>

          <Card sx={{ my: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                学校名
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                学費:年間約{tuitionParams}万円
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">詳細を見る</Button>
            </CardActions>
          </Card>

          {/* {schoolsData.length > 0 ? (
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
          )} */}
        </Box>
      </Container>
    </>
  );
};

export default SearchResultPage;
