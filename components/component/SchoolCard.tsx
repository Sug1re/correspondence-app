"use client";

import { db } from "@/firebase";
import {
  Box,
  Button,
  Card,
  CardActions,
  Grid,
  Link,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import * as Component from "@/components/component";
import * as CustomHook from "@/components/customHook";

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

const SchoolCard = () => {
  const [openModalId, setOpenModalId] = useState<string | null>(null); // 各学校ごとのモーダルのIDを管理
  const handleOpen = (schoolId: string) => setOpenModalId(schoolId); // モーダルを開く関数
  const handleClose = () => setOpenModalId(null); // モーダルを閉じる関数

  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // ロード中かどうかの状態

  useEffect(() => {
    const fetchSchools = async () => {
      const schoolRef = collection(db, "schools");

      try {
        const snapshot = await getDocs(schoolRef); // すべてのデータを取得
        const schoolsData: School[] = snapshot.docs.map((doc) => {
          const data = doc.data();
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
        console.log(schoolsData); // データ取得確認
        setSchools(schoolsData);
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchools();
  }, []);

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
                            style={{ width: "11px", height: "11px" }}
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
                              boxShadow: "0px 4px 10px rgba(255, 102, 0, 0.4)",
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
                              borderRadius: 2,
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
                                ￥{school.firstYearFee.toLocaleString("JA-JP")}
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
                                ￥{school.secondYearFee.toLocaleString("JA-JP")}
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
                                ￥{school.thirdYearFee.toLocaleString("JA-JP")}
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
    </>
  );
};

export default SchoolCard;
