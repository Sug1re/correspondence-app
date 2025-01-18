"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
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

  // クエリパラメータの取得
  const tuitionParams = searchParams.get("tuition"); // クエリパラメータ ”tuition” を獲得

  // 検索結果を保持する状態
  // const [schoolsData, setSchoolsData] = React.useState<any>([]);
  // const [loading, setLoading] = React.useState(true);

  // const q = query(collection(db, "cities"), where("capital", "==", true));

  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });

  // fireStoreからデータを取得できない
  // API 経由でデータを取得
  // React.useEffect(() => {
  //   const fetchSchools = async () => {
  //     setLoading(true);

  //     try {
  //       const snapshot = await getDocs(collection(db, "schools"));
  //       const schoolData = snapshot.map((doc) => doc.data);

  //       // tuition をクエリパラメータより小さい学校に絞り込む
  //       const filteredSchools = data.filter(
  //         (school: { tuition: number }) =>
  //           school.tuition < (tuitionParams ? parseInt(tuitionParams) : 200)
  //       );
  //       setSchoolsData(filteredSchools);
  //     } catch (error) {
  //       console.error("Error fetching schools: ", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSchools();
  // }, [tuitionParam]);

  // fireStoreからデータを取得できる
  // データベースからデータを取得する
  // const schoolsData = await getDocs(collection(db, "schools")).then(
  //   (snapshot) =>
  //     snapshot.docs.map((doc) => {
  //       return doc.data();
  //     })
  // );

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

          {/* {loading ? (
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
          )} */}

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
