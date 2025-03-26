"use client";

import { db } from "@/firebase";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
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
  border: `2px solid #FF6600`,
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
            <Typography component="span">
              <Box
                component="span"
                sx={{ fontWeight: "bold", color: "#000000" }}
              >
                {schools.length}
              </Box>
              件の学校が見つかりました
            </Typography>

            {schools.map((school) => (
              <Card
                key={school.id}
                sx={{
                  mt: 2,
                  boxShadow: 5,
                  borderRadius: 2,
                  border: `1.5px solid  #003399`,
                }}
              >
                {/* 学校の画像を挿入 */}
                <Box
                  sx={{
                    backgroundColor: "#003399",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={`/imgSchool/${school.imgUrl}`}
                    alt={school.name}
                    sx={{
                      backgroundSize: "cover", // 画像を要素いっぱいに広げる
                      backgroundPosition: "center", // 画像の中央を表示（Tailwindのbg-centerと同じ）
                      backgroundRepeat: "no-repeat", // 繰り返しを無効
                      width: "100%",
                      height: 200,
                    }}
                  />
                </Box>

                {/* カードタイトル */}
                <CardContent>
                  <Link
                    href={school.url}
                    sx={{
                      textDecoration: "none", // 下線をなくす
                      fontWeight: "bold",
                      color: "text.primary",
                      "&:hover": {
                        color: "primary.main", // ホバー時のテキストカラー
                        textDecoration: "underLine",
                      },
                    }}
                  >
                    {school.name}
                  </Link>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {school.course}
                  </Typography>

                  {/* 学費総額 */}
                  <Card
                    sx={{
                      mt: 1,
                      borderRadius: 2,
                      border: `1px solid #FF6600`,
                    }}
                  >
                    <Typography
                      sx={{
                        pt: 1,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      3年間の学費総額：￥
                      {school.totalTuitionFee.toLocaleString("ja-JP")}
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
                        onClick={() => handleOpen(school.id)}
                      >
                        詳細はこちら ＞
                      </Button>
                    </CardActions>
                  </Card>
                </CardContent>

                {/* モーダル */}
                <Modal
                  open={openModalId === school.id}
                  onClose={handleClose}
                  BackdropProps={{
                    sx: { backgroundColor: "rgba(0, 0, 0, 0.07)" },
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
                          //   py: 1,
                          gap: 1,
                          borderRadius: 4,
                          backgroundColor: "#FF6600",
                          width: "80%",
                        }}
                      >
                        学費総額の詳細
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
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
                          className="size-6"
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
                            "& td": { borderBottom: "1.5px solid #003399" },
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
                            "& td": { borderBottom: "1.5px solid #003399" },
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
                            "& td": { borderBottom: "1.5px solid #003399" },
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
                            "& td": { borderBottom: "1.5px solid #003399" },
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
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default SchoolCard;
