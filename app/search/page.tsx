"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
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
type School = {
  id: string;
  name: string;
  tuition: number;
  attendanceFrequency: string[];
  // fireStoreのコレクションを追加
};
const SearchResultPage = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // ロード中かどうかの状態
  const searchParams = useSearchParams();
  // クエリパラメータの取得
  const tuitionParams = searchParams.get("tuition"); // クエリパラメータ ”tuition” を獲得
  const attendanceFrequencyParams = searchParams.get("attendanceFrequency"); // クエリパラメータ　”attendanceFrequency”　を獲得
  // fireStoreのコレクションを追加
  // nullチェックしてから、stringをnumberに変換
  const tuition = tuitionParams ? parseInt(tuitionParams) : NaN; // tuition がNaNの場合は最大値を設定
  const attendanceFrequency = attendanceFrequencyParams || "";
  // データベースからデータを取得する
  useEffect(() => {
    const fetchSchools = async () => {
      const schoolRef = collection(db, "schools");
      // tuitionが0の場合、最大値を設定
      const maxTuition = 200; // 例えば最大値として200を設定
      const tuitionValue = tuition === 0 ? maxTuition : tuition; // tuitionが0なら最大値に設定
      let q;
      // "登校スタイルを選択"の場合、attendanceFrequencyフィールドをフィルタリングしない
      if (attendanceFrequency === "登校スタイルを選択") {
        q = query(
          schoolRef,
          where("tuition", "<=", tuitionValue),
          orderBy("tuition", "asc")
        );
      } else {
        q = query(
          schoolRef,
          where("attendanceFrequency", "array-contains", attendanceFrequency),
          where("tuition", "<=", tuitionValue),
          orderBy("tuition", "asc")
        );
      }
      try {
        const snapshot = await getDocs(q);
        const schoolsData: School[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          tuition: doc.data().tuition,
          attendanceFrequency: doc.data().attendanceFrequency,
        }));
        // 取得できているか確認
        console.log(schoolsData);
        setSchools(schoolsData);
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setIsLoading(false); // データ取得後にロード完了
      }
    };
    fetchSchools();
  }, [tuition, attendanceFrequency]);
  return (
    <>
      <Component.Header />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            検索結果
          </Typography>
          {/* ロード中の場合 */}
          {isLoading ? (
            <Typography variant="h6" color="text.secondary">
              読み込み中...
            </Typography>
          ) : // 学校が見つからない場合にメッセージを表示
          schools.length === 0 ? (
            <Typography variant="h6" color="text.secondary">
              条件に一致する学校はありませんでした
            </Typography>
          ) : (
            // 学校が見つかった場合
            schools.map((school) => (
              <Card key={school.id} sx={{ my: 2 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {school.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    学費:年間約{school.tuition}万円
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    登校スタイル:{school.attendanceFrequency.join("・")}コース
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">詳細を見る</Button>
                </CardActions>
              </Card>
            ))
          )}
        </Box>
      </Container>
    </>
  );
};
export default SearchResultPage;
