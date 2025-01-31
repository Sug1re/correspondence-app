"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
export default function Example() {
  const theme = useTheme();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return <Box sx={{ minHeight: "auto", padding: 4 }}>Loading...</Box>;
  }
  return (
    <>
      <Box
        sx={{
          minHeight: "auto",
          backgroundColor: blueGrey[50],
          padding: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* schoolCard */}
        <Card
          sx={{
            width: 800,
            padding: 3,
            boxShadow: 5,
            borderRadius: 2,
            backgroundColor: blueGrey[100],
            border: `1px solid ${theme.palette.primary?.light || "#90CAF9"}`, // 修正: `?.` でSSRエラーを防ぐ
            display: "flex",
            flexDirection: "row",
            gap: 3,
          }}
        >
          <CardContent sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                mb: 2,
                color: theme.palette.primary?.main || "#1976D2", // SSR時はデフォルトの青を適用
              }}
            >
              未来学園高等学校
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                mb: 1,
                color: theme.palette.primary?.main || "#1976D2",
              }}
            >
              基本情報
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  {[
                    ["通学コース", "通学 / オンライン"],
                    ["週何登校", "週1～5日から選択可"],
                    ["授業形式", "オンライン授業 / 登校授業"],
                    ["登校日数", "週1日 / 週3日 / 週5日から選択"],
                    ["学校の種類", "通信制高校（サポート校あり）"],
                  ].map(([label, value], index) => (
                    <TableRow
                      key={label}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? blueGrey[50] : blueGrey[100],
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          width: "40%",
                          fontSize: "0.875rem",
                          color: blueGrey[800],
                        }}
                      >
                        {label}
                      </TableCell>
                      <TableCell
                        sx={{ color: blueGrey[700], fontSize: "0.875rem" }}
                      >
                        {value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          <CardContent sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                mb: 1,
                color: theme.palette.primary?.main || "#1976D2",
              }}
            >
              費用情報
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  {[
                    ["初期費用", "¥50,000（入学金など）"],
                    ["受験料", "¥10,000"],
                    ["授業料", "¥300,000 / 年（単位制、コースによって変動）"],
                  ].map(([label, value], index) => (
                    <TableRow
                      key={label}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? blueGrey[50] : blueGrey[100],
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          width: "40%",
                          fontSize: "0.875rem",
                          color: blueGrey[800],
                        }}
                      >
                        {label}
                      </TableCell>
                      <TableCell
                        sx={{ color: blueGrey[700], fontSize: "0.875rem" }}
                      >
                        {value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                mt: 2,
                mb: 1,
                color: theme.palette.primary?.main || "#1976D2",
              }}
            >
              スクーリング
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  {[
                    ["スクーリングの有無", "あり"],
                    ["スクーリング場所", "県内 / 県外（選択可）"],
                  ].map(([label, value], index) => (
                    <TableRow
                      key={label}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? blueGrey[50] : blueGrey[100],
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          width: "40%",
                          fontSize: "0.875rem",
                          color: blueGrey[800],
                        }}
                      >
                        {label}
                      </TableCell>
                      <TableCell
                        sx={{ color: blueGrey[700], fontSize: "0.875rem" }}
                      >
                        {value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
