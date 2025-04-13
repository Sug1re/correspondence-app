"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import * as Component from "@/components/component";
import * as CustomHook from "@/components/customHook";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  Container,
  Grid,
  Link,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";

// fireStore の型定義
type School = {
  id: string;
  name: string;
  course: string;
  totalTuitionFee: number;
  firstYearFee: number;
  secondYearFee: number;
  thirdYearFee: number;
  testFee: number;
  movingOutsideThePrefecture: boolean;
  commutingStyle: string;
  highSchool: string;
  url: string;
  imgUrl: string;
  attendanceFrequency: string[];
  // fireStoreのコレクションを追加
};

// モーダルのUI
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
  bgcolor: "background.paper",
  px: 4,
  py: 2,
  borderRadius: 3,
  border: `0.5px solid #FF6600`,
};

const SearchResultPage = () => {
  // スクロールで見えるヘッダー関係の関数
  const [showHeader, setShowHeader] = useState(false);
  const prevScrollY = useRef(0);

  // モーダル関係の関数
  const [openModalId, setOpenModalId] = useState<string | null>(null); // 各学校ごとのモーダルのIDを管理
  const handleOpen = (schoolId: string) => setOpenModalId(schoolId); // モーダルを開く関数
  const handleClose = () => setOpenModalId(null); // モーダルを閉じる関数

  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // ロード中かどうかの状態
  const searchParams = useSearchParams();

  // クエリパラメータの取得
  const courseParams = searchParams.get("course"); // クエリパラメータ "course" を獲得
  const totalTuitionFeeParams = searchParams.get("totalTuitionFee"); // クエリパラメータ ”totalTuitionFee” を獲得
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

  // string型
  const attendanceFrequency = attendanceFrequencyParams || "";
  const highSchool = highSchoolParams || "";
  const course = courseParams || "";
  const commutingStyle = commutingStyleParams || "";

  // boolean型
  // "true" なら true, それ以外（null, undefined, "false"）は false に変換

  const movingOutsideThePrefecture =
    movingOutsideThePrefectureParams === "true";

  // スクロールヘッダーのコード
  useEffect(() => {
    // 初期スクロール位置を設定（ページリロード時にヘッダーが表示されないように）
    const currentScrollY = window.scrollY;
    if (currentScrollY < 100) {
      setShowHeader(false); // スクロール位置が100px未満の場合、ヘッダーを隠す
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      //
      if (currentScrollY > 100) {
        setShowHeader(true); // 下にスクロールしたらヘッダーを表示
      } else if (currentScrollY < 100) {
        setShowHeader(false); // 上にスクロールしたらヘッダーを隠す
      }

      prevScrollY.current = currentScrollY; // 前回のスクロール位置を更新
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // prevScrollY を useRef で管理しているので、依存配列は空にする

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
            totalTuitionFee: data.totalTuitionFee,
            firstYearFee: data.firstYearFee,
            secondYearFee: data.secondYearFee,
            thirdYearFee: data.thirdYearFee,
            testFee: data.testFee,
            movingOutsideThePrefecture: data.movingOutsideThePrefecture,
            commutingStyle: data.commutingStyle,
            highSchool: data.highSchool,
            url: data.url,
            imgUrl: data.imgUrl,
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
    highSchool,
    attendanceFrequency,
    movingOutsideThePrefecture,
    course,
    commutingStyle,
  ]);

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    handleNextPage,
    handlePrevPage,
  } = CustomHook.usePagination(schools.length); // usePagination に schools.length を渡す

  const currentSchools = schools.slice(startIndex, endIndex);

  return (
    <>
      <Component.Header />

      {/* ヘッダーの表示制御 */}
      <AppBar
        position="fixed"
        sx={{
          transition: "top 0.5s",
          top: showHeader ? 0 : "-64px",
          background: "#FFFFFF",
          padding: 0,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box sx={{ color: "#696969", display: "center", gap: 2 }}>
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ width: "24px", height: "24px", color: "#FF6600" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                />
              </svg>
              <Typography sx={{ fontSize: "0.8rem" }}>
                {movingOutsideThePrefectureParams ? "県外" : "県内"}
              </Typography>
            </Box>
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ width: "24px", height: "24px", color: "#FF6600" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                />
              </svg>
              <Typography sx={{ fontSize: "0.8rem" }}>
                {commutingStyle}
              </Typography>
            </Box>
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ width: "24px", height: "24px", color: "#FF6600" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              <Typography sx={{ fontSize: "0.8rem" }}>{highSchool}</Typography>
            </Box>
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ width: "24px", height: "24px", color: "#FF6600" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              <Typography sx={{ fontSize: "0.8rem" }}>
                {attendanceFrequency}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        {/* 検索窓 */}
        <Component.SearchBar />

        {/* 学校情報 */}
        <Box sx={{ pb: 4 }}>
          {/* ロード中の場合 */}
          {isLoading ? (
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
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
            <>
              {/* ページネーションボタン */}
              <Component.PaginationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />

              <Grid
                container
                spacing={2}
                columns={{ sm: 4, md: 8 }}
                sx={{ pt: 2 }}
              >
                {currentSchools.map((school) => (
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
                      }}
                    >
                      {/* 学校の画像を挿入 */}
                      <Link
                        href={school.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Box
                          component="img"
                          src={`/imgSchool/${school.imgUrl}`}
                          alt={school.name}
                          sx={{
                            width: "100%",
                            height: 200,
                            objectFit: "cover", // ← これがポイント
                            objectPosition: "center",
                            display: "block",
                          }}
                        />
                      </Link>

                      {/* カードタイトル */}
                      <Box sx={{ my: 1, mx: 0.5 }}>
                        <Link
                          href={school.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: "flex",
                            fontSize: "13px",
                            ml: 1,
                            textDecoration: "none", // 下線をなくす
                            fontWeight: 600,
                            color: "text.primary",
                            "&:hover": {
                              color: "primary.main", // ホバー時のテキストカラー
                              textDecoration: "underLine",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              pr: 0.5,
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              style={{
                                width: "11px",
                                height: "11px",
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                              />
                            </svg>
                          </Box>

                          {school.name}
                        </Link>

                        <Typography
                          sx={{
                            fontSize: "8px",
                            ml: 1,
                          }}
                        >
                          {school.course || "コース情報なし"}
                        </Typography>

                        {/* 学費総額 */}
                        <Card
                          sx={{
                            m: 0.5,
                            borderRadius: 2,
                            border: `0.5px solid #FF6600`,
                          }}
                        >
                          <Typography
                            sx={{
                              pt: 0.5,
                              ml: 2,
                              fontSize: "8px",
                            }}
                          >
                            3年間の学費総額
                          </Typography>
                          <Typography
                            sx={{
                              ml: 2,
                              fontWeight: 600,
                              fontSize: "12px",
                            }}
                          >
                            ￥{school.totalTuitionFee.toLocaleString("ja-JP")}
                          </Typography>

                          <CardActions sx={{ justifyContent: "center" }}>
                            <Button
                              size="small"
                              sx={{
                                width: "80vh",
                                borderRadius: 2,
                                backgroundColor: "#FF6600",
                                color: "#FFFFFF",
                                boxShadow:
                                  "0px 4px 10px rgba(255, 102, 0, 0.4)",
                              }}
                              onClick={() => handleOpen(school.id)}
                            >
                              <Typography
                                sx={{
                                  fontSize: "10px",
                                  fontWeight: 600,
                                }}
                              >
                                詳細
                              </Typography>
                            </Button>
                          </CardActions>
                        </Card>
                      </Box>

                      {/* モーダル */}
                      <Modal
                        open={openModalId === school.id}
                        onClose={handleClose}
                        BackdropProps={{
                          sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                        }}
                      >
                        <Card sx={style}>
                          {/* 閉じるボタン */}
                          <Box sx={{ display: "flex" }}>
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                color: "#FFFFFF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                py: 1,
                                gap: 1,
                                borderRadius: 4,
                                backgroundColor: "#FF6600",
                                width: "80%",
                              }}
                            >
                              学費総額の内訳
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                style={{ width: "24px", height: "24px" }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                              </svg>
                            </Typography>
                            <Button
                              onClick={handleClose}
                              sx={{ color: "#000000", width: "20%" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                style={{ width: "24px", height: "24px" }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            </Button>
                          </Box>

                          {/* 学費情報 */}
                          <Table>
                            <TableBody>
                              <TableRow
                                sx={{
                                  "& td": { borderBottom: "1px solid #003399" },
                                }}
                              >
                                <TableCell
                                  sx={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  初年次の学費
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  ￥
                                  {school.firstYearFee.toLocaleString("JA-JP")}
                                </TableCell>
                              </TableRow>
                              <TableRow
                                sx={{
                                  "& td": { borderBottom: "1px solid #003399" },
                                }}
                              >
                                <TableCell
                                  sx={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  2年次の学費
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  ￥
                                  {school.secondYearFee.toLocaleString("JA-JP")}
                                </TableCell>
                              </TableRow>
                              <TableRow
                                sx={{
                                  "& td": { borderBottom: "1px solid #003399" },
                                }}
                              >
                                <TableCell
                                  sx={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  3年次の学費
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  ￥
                                  {school.thirdYearFee.toLocaleString("JA-JP")}
                                </TableCell>
                              </TableRow>
                              <TableRow
                                sx={{
                                  "& td": { borderBottom: "1px solid #003399" },
                                }}
                              >
                                <TableCell
                                  sx={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  受験料
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontWeight: "bold",
                                  }}
                                >
                                  ￥{school.testFee.toLocaleString("JA-JP")}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Card>
                      </Modal>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
        <Component.Footer />
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
