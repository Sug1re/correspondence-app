"use client";

import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  Grid,
  Link,
  Modal,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { School } from "@/app/types/school";
import * as CustomHook from "@/hooks/index";
import * as Icon from "@/icons/index";
import { auth } from "@/firebase";
import { toggleFavoriteSchool } from "@/lib/firebase/favorite";
import { useAuthState } from "react-firebase-hooks/auth";

type SchoolCardListProps = {
  schools: School[];
  onFavoritesChange?: (favorites: string[]) => void; // 追加
};

const SchoolCardList: React.FC<SchoolCardListProps> = ({
  schools,
  onFavoritesChange,
}) => {
  const [user] = useAuthState(auth);

  // カスタムフックuseModal
  const { openModalId, handleOpen, handleClose } = CustomHook.useModal();

  // HeartIconの用途別カスタム
  const [likedSchools, setLikedSchools] = React.useState<
    Record<string, boolean>
  >({});
  const [errorOpen, setErrorOpen] = React.useState(false);

  // ブックマーク切り替え処理
  const toggleLike = async (schoolId: string) => {
    if (!user) {
      setErrorOpen(true);
      return;
    }
    const updatedLike = !likedSchools[schoolId];
    setLikedSchools((prev) => ({
      ...prev,
      [schoolId]: updatedLike,
    }));
    await toggleFavoriteSchool(user.uid, schoolId, updatedLike);
  };
  return (
    <>
      <Grid container spacing={2} columns={{ sm: 4, md: 8 }} sx={{ pt: 2 }}>
        {schools.map((school) => (
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
                position: "relative",
              }}
            >
              {/* お気に入り登録ボタン */}
              <Box
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                }}
              >
                <Icon.BookmarkIcon
                  filled={likedSchools[school.id]}
                  fillColor="#FF6611"
                  onClick={() => toggleLike(school.id)}
                  sx={{
                    transition: "all 1s ease",
                    color: "#FF6611",
                    cursor: "pointer",
                  }}
                />
              </Box>

              {/* 学校の画像を挿入 */}
              <Link href={school.url} target="_blank" rel="noopener noreferrer">
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
                    <Icon.LinkIcon />
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

                  {school.attendanceFrequency?.length > 0 && (
                    <Box component="span" sx={{ ml: 0.5, color: "#003399" }}>
                      {school.attendanceFrequency.map((freq, index) => (
                        <Box key={index} component="span" sx={{ mr: 0.5 }}>
                          #{freq}
                        </Box>
                      ))}
                    </Box>
                  )}
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
                <Card
                  sx={{
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
                  }}
                >
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
                      <Icon.ChevronDownIcon />
                    </Typography>
                    <Button
                      onClick={handleClose}
                      sx={{ color: "#000000", width: "20%" }}
                    >
                      <Icon.CloseIcon />
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
                          二年次の学費
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
                          三年次の学費
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

              {/* アラート */}
              <Snackbar
                open={errorOpen}
                autoHideDuration={3000}
                onClose={() => setErrorOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={() => setErrorOpen(false)}
                  severity="warning"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  お気に入り登録にはログインが必要です
                </Alert>
              </Snackbar>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SchoolCardList;
