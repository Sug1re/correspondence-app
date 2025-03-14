"use client";

import React, { Suspense, useEffect, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

// fireStore の型定義
type School = {
  id: string;
  name: string;
  course: string;
  totalTuitionFee: number;
  "1-tuitionFee": number;
  "2-tuitionFee": number;
  "3-tuitionFee": number;
  testFee: number;
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
  // const router = useRouter(); // ページ遷移時に必要な変数

  // クエリパラメータの取得
  const courseParams = searchParams.get("course"); // クエリパラメータ "course" を獲得
  const totalTuitionFeeParams = searchParams.get("totalTuitionFee"); // クエリパラメータ ”totalTuitionFee” を獲得
  const testFeeParams = searchParams.get("testFee"); // クエリパラメータ "testFee" を獲得
  const movingOutsideThePrefectureParams = searchParams.get(
    "movingOutsideThePrefecture"
  ); // クエリパラメータ "movingOutsideThePrefecture" を獲得
  const commutingStyleParams = searchParams.get("commutingStyle"); // クエリパラメータ "commutingStyle" を獲得
  const highSchoolParams = searchParams.get("highSchool"); // クエリパラメータ　”highSchool”　を獲得
  const attendanceFrequencyParams = searchParams.get("attendanceFrequency"); // クエリパラメータ　”attendanceFrequency”　を獲得

  // fireStoreのコレクションを追加

  // number型
  // nullチェックしてから、stringをnumberに変換
  const totalTuitionFee = totalTuitionFeeParams
    ? parseInt(totalTuitionFeeParams)
    : NaN; // testFee がNaNの場合は最大値を設定
  const testFee = testFeeParams ? parseInt(testFeeParams) : NaN; // testFee がNaNの場合は最大値を設定

  // string型
  const attendanceFrequency = attendanceFrequencyParams || "";
  const highSchool = highSchoolParams || "";
  const course = courseParams || "";
  const commutingStyle = commutingStyleParams || "";

  // boolean型
  // "true" なら true, それ以外（null, undefined, "false"）は false に変換

  const movingOutsideThePrefecture =
    movingOutsideThePrefectureParams === "true";

  // データベースからデータを取得する
  useEffect(() => {
    const fetchSchools = async () => {
      const schoolRef = collection(db, "schools");

      // フィルタリング機能
      const q = query(
        schoolRef,
        where("totalTuitionFee", "<=", totalTuitionFee),
        where("movingOutsideThePrefecture", "==", movingOutsideThePrefecture),
        where("commutingStyle", "==", commutingStyle),
        where("highSchool", "==", highSchool),
        where("attendanceFrequency", "array-contains", attendanceFrequency)
      );

      try {
        const snapshot = await getDocs(q);
        const schoolsData: School[] = snapshot.docs.map((doc) => {
          const data = doc.data(); // doc.data() を変数に代入
          return {
            id: doc.id,
            name: data.name,
            course: data.course,
            initialSetupCosts: data.initialSetupCosts,
            totalTuitionFee: data.totalTuitionFee,
            "1-tuitionFee": data["1-tuitionFee"], //  ブラケット記法を使う
            "2-tuitionFee": data["2-tuitionFee"],
            "3-tuitionFee": data["3-tuitionFee"],
            tuitionFee: data.tuitionFee,
            testFee: data.testFee,
            movingOutsideThePrefecture: data.movingOutsideThePrefecture,
            commutingStyle: data.commutingStyle,
            highSchool: data.highSchool,
            attendanceFrequency: data.attendanceFrequency,
          };
        });
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
    totalTuitionFee,
    testFee,
    highSchool,
    attendanceFrequency,
    movingOutsideThePrefecture,
    course,
    commutingStyle,
  ]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ページ遷移後の処理
  // const handleSchoolDetail = (schoolId: string) => {
  //   router.push(`/schoolsIntroduction?id=${schoolId}`); // /schoolIntroduction に遷移,schoolId　をクエリパラメータとして渡す
  // };

  return (
    <>
      <Component.Header />

      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          {/* ロード中の場合 */}
          {isLoading ? (
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
              <Card
                key={school.id}
                sx={{
                  mt: 2,
                  boxShadow: 5,
                  borderRadius: 2,
                  border: `1px solid  #003399`,
                }}
              >
                {/* 学校の画像を挿入 */}
                <Box sx={{ py: 7, backgroundColor: "#003399" }}></Box>

                {/* カードタイトル */}
                <Typography
                  sx={{
                    pt: 2,
                    px: 2,
                    fontWeight: "bold",
                    color: "FF9100",
                  }}
                >
                  {school.name}
                  <br />
                  {school.course}
                </Typography>

                {/* 学費総額 */}
                <CardContent>
                  <Card
                    sx={{
                      borderRadius: 2,
                      border: `1px solid #FF6600`,
                      flexDirection: "row",
                      gap: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        pt: 1,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "FF9100",
                      }}
                    >
                      ￥{school.totalTuitionFee.toLocaleString("ja-JP")}
                    </Typography>
                    <CardActions sx={{ justifyContent: "center" }}>
                      <Button
                        size="small"
                        sx={{
                          px: 8,
                          borderRadius: 4,
                          backgroundColor: "#FF6600",
                          fontWeight: "bold",
                          color: "#FFFFFF",
                        }}
                        onClick={handleClickOpen}
                      >
                        詳細はこちら ＞
                      </Button>
                    </CardActions>
                  </Card>
                </CardContent>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>学費の詳細</DialogTitle>
                  <DialogContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>初年次の学費</TableCell>
                          <TableCell>
                            ￥{school.testFee.toLocaleString("ja-JP")}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2年次の学費</TableCell>
                          <TableCell>
                            ￥{school.testFee.toLocaleString("ja-JP")}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>3年次の学費</TableCell>
                          <TableCell>
                            ￥{school.testFee.toLocaleString("ja-JP")}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>検定料</TableCell>
                          <TableCell>
                            ￥{school.testFee.toLocaleString("ja-JP")}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </DialogContent>
                </Dialog>

                {/* ボタン */}
                {/* <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button
                    size="small"
                    sx={{
                      fontWeight: "bold",
                      color: "FF9100",
                    }}
                    onClick={() => handleSchoolDetail(school.id)}
                  >
                    詳細
                  </Button>
                </CardActions> */}
              </Card>
            ))
          )}
        </Box>
      </Container>
    </>
  );
};

const SearchPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchResultPage />
  </Suspense>
);

export default SearchPageWithSuspense;
