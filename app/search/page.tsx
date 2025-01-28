"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

// fireStore の型定義
type School = {
  id: string;
  name: string;
  course: string;
  initialSetupCosts: number;
  tuitionFee: number;
  testFee: number;
  schooling: boolean;
  movingOutsideThePrefecture: boolean;
  commutingStyle: string;
  highSchool: string;
  attendanceFrequency: string[];

  // fireStoreのコレクションを追加
};
const SearchResultPage = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // ロード中かどうかの状態
  const searchParams = useSearchParams();
  const router = useRouter(); // ページ遷移時に必要な変数

  // クエリパラメータの取得
  const courseParams = searchParams.get("course"); // クエリパラメータ "course" を獲得
  const initialSetupCostsParams = searchParams.get("initialSetupCosts"); // クエリパラメータ ”initialSetupCosts” を獲得
  const tuitionFeeParams = searchParams.get("tuitionFee"); // クエリパラメータ "tuitionFee" を獲得
  const testFeeParams = searchParams.get("testFee"); // クエリパラメータ "testFee" を獲得
  const schoolingParams = searchParams.get("schooling"); // クエリパラメータ　”schooling”　を獲得
  const movingOutsideThePrefectureParams = searchParams.get(
    "movingOutsideThePrefecture"
  ); // クエリパラメータ "movingOutsideThePrefecture" を獲得
  const commutingStyleParams = searchParams.get("commutingStyle"); // クエリパラメータ "commutingStyle" を獲得
  const highSchoolParams = searchParams.get("highSchool"); // クエリパラメータ　”highSchool”　を獲得
  const attendanceFrequencyParams = searchParams.get("attendanceFrequency"); // クエリパラメータ　”attendanceFrequency”　を獲得

  // fireStoreのコレクションを追加

  // number型
  // nullチェックしてから、stringをnumberに変換
  const initialSetupCosts = initialSetupCostsParams
    ? parseInt(initialSetupCostsParams)
    : NaN; // initialSetupCosts がNaNの場合は最大値を設定
  const testFee = testFeeParams ? parseInt(testFeeParams) : NaN; // testFee がNaNの場合は最大値を設定
  const tuitionFee = tuitionFeeParams ? parseInt(tuitionFeeParams) : NaN; // tuitionFee がNaNの場合は最大値を設定

  // string型
  const attendanceFrequency = attendanceFrequencyParams || "";
  const highSchool = highSchoolParams || "";
  const course = courseParams || "";
  const commutingStyle = commutingStyleParams || "";

  // boolean型
  // "true" なら true, それ以外（null, undefined, "false"）は false に変換
  const schooling = schoolingParams === "true";
  const movingOutsideThePrefecture =
    movingOutsideThePrefectureParams === "true";

  // データベースからデータを取得する
  useEffect(() => {
    const fetchSchools = async () => {
      const schoolRef = collection(db, "schools");

      // initialSetupCostsが0の場合、最大値を設定
      const maxInitialSetupCosts = 200; // 例えば最大値として200を設定

      const initialSetupCostsValue =
        initialSetupCosts === 0 ? maxInitialSetupCosts : initialSetupCosts; // initialSetupCostsが0なら最大値に設定

      // フィルタリング機能
      // testFee, tuitionFee, highSchool, movingOutsideThePrefecture, course, commutingStyle を追加しよう
      // attendanceFrequency も変化

      let q;

      // "登校スタイルを選択"の場合、attendanceFrequencyフィールドをフィルタリングしない
      if (attendanceFrequency === "登校スタイルを選択") {
        q = query(
          schoolRef,
          where("initialSetupCosts", "<=", initialSetupCostsValue),
          orderBy("initialSetupCosts", "asc")
        );
      } else {
        q = query(
          schoolRef,
          where("attendanceFrequency", "array-contains", attendanceFrequency),
          where("initialSetupCosts", "<=", initialSetupCostsValue),
          orderBy("initialSetupCosts", "asc")
        );
      }
      try {
        const snapshot = await getDocs(q);
        const schoolsData: School[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          course: doc.data().course,
          initialSetupCosts: doc.data().initialSetupCosts,
          tuitionFee: doc.data().tuitionFee,
          testFee: doc.data().testFee,
          schooling: doc.data().schooling,
          movingOutsideThePrefecture: doc.data().movingOutsideThePrefecture,
          commutingStyle: doc.data().commutingStyle,
          highSchool: doc.data().highSchool,
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
  }, [
    initialSetupCosts,
    testFee,
    tuitionFee,
    highSchool,
    attendanceFrequency,
    schooling,
    movingOutsideThePrefecture,
    course,
    commutingStyle,
  ]);

  // 学校詳細ページの遷移処理
  const handleSchoolDetail = (schoolId: string) => {
    router.push(`/schoolsIntroduction?id=${schoolId}`); // /schoolIntroduction に遷移,schoolId　をクエリパラメータとして渡す
  };
  return (
    <>
      <Component.Header />

      <Container maxWidth="md">
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
              <Card key={school.id} sx={{ my: 3 }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {school.name} :
                    <span className="text-blue-600"> {school.course}</span>
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 1.5,
                    }}
                  >
                    <Typography color="text.secondary">
                      初期費用：1年次{school.initialSetupCosts}万円
                    </Typography>
                    <Typography color="text.secondary">
                      授業料：3年間{school.tuitionFee}万円
                    </Typography>
                    <Typography color="text.secondary">
                      受験料：{school.testFee}万円
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 1.5,
                    }}
                  >
                    <Typography color="text.secondary">
                      通学形態：{school.commutingStyle}
                    </Typography>
                    <Typography color="text.secondary">
                      スクーリング：{school.schooling ? "あり" : "なし"}
                    </Typography>
                    <Typography color="text.secondary">
                      県外移動：
                      {school.movingOutsideThePrefecture ? "あり" : "なし"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 1.5,
                    }}
                  >
                    <Typography color="text.secondary">
                      登校頻度：{school.attendanceFrequency.join("/")}
                    </Typography>
                    <Typography color="text.secondary">
                      {school.highSchool}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button
                    size="small"
                    onClick={() => handleSchoolDetail(school.id)}
                  >
                    詳細
                  </Button>
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
