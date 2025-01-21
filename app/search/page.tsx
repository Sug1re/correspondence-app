"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  const attendanceFrequency = attendanceFrequencyParams || "";

  // データベースからデータを取得する
  useEffect(() => {
    const fetchSchools = async () => {
      const schoolRef = collection(db, "schools");

    

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
