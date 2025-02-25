"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import * as Component from "@/components/component";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import InfoItem from "@/components/component/InfoItem";
import Image from "next/image";

// fireStore の型定義
type School = {
  id: string;
  url: string;
  imgUrl: string;
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
};

export default function SchoolsIntroductionPage() {
  const searchParams = useSearchParams();
  const schoolId = searchParams.get("id");
  const [school, setSchool] = useState<School | null>(null);

  // fireStore からデータを取得
  useEffect(() => {
    if (!schoolId) return;

    const fetchSchool = async () => {
      try {
        const docRef = doc(db, "schools", schoolId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSchool({ id: docSnap.id, ...docSnap.data() } as School);
        }
      } catch (error) {
        console.error("Error fetching school:", error);
      }
    };

    fetchSchool();
  }, [schoolId]);

  if (!school)
    return (
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        Loading...
      </Typography>
    );
  return (
    <>
      <Component.Header />

      {/* 学校名 */}
      <Container maxWidth="md">
        <Box sx={{ mt: 2, color: "#333" }}>
          <Typography
            variant="h2"
            sx={{
              px: 2,
              fontWeight: 600,
              fontSize: "30px",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "solid 4px #6495ed",
            }}
          >
            {school.name}
            <br />
            {school.course}
          </Typography>
          {/* 画像とサイトへのリンク */}
          <Box sx={{ m: 1, display: "flex", justifyContent: "center" }}>
            <a href={school.url}>
              <Image
                src={`/imgSchool/${school.imgUrl}`}
                alt={school.name}
                width="500"
                height="400"
              />
            </a>
          </Box>
        </Box>

        {/* 学校情報 */}
        <Box>
          {/* 学費 */}
          <Box>
            <Typography
              variant="h3"
              sx={{
                mt: 2,
                fontWeight: 550,
                textAlign: "center",
                fontSize: "28px",
                borderBottom: "solid 4px cornflowerblue ",
              }}
            >
              学費
            </Typography>

            {/* 小見出し */}
            <Typography
              variant="h3"
              sx={{
                mt: 1,
                ml: 1,
                fontSize: "20px",
              }}
            >
              費用
            </Typography>

            {/* データ表示 */}
            <Box sx={{ ml: "50px" }}>
              <Typography variant="body1" sx={{ fontSize: "20px" }}>
                初期費用：{school.initialSetupCosts}万円
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "20px" }}>
                授業料：{school.tuitionFee}万円
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "20px" }}>
                受験料：{school.testFee}万円
              </Typography>
            </Box>
          </Box>

          {/* 詳細 */}
          <Box
            sx={{
              pb: 3,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mt: 1,
                fontWeight: 550,
                textAlign: "center",
                fontSize: "28px",
                borderBottom: "solid 4px cornflowerblue",
              }}
            >
              詳細
            </Typography>

            <Box
              sx={{
                mt: 1,
                display: "flex",
              }}
            >
              {/* 小見出し */}
              <Typography
                variant="h4"
                sx={{ ml: 1, fontSize: "20px", flex: 1 }}
              >
                学校の種類
              </Typography>

              {/* コンポーネント */}
              <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
                <InfoItem text={school.highSchool} />
              </Box>
            </Box>

            <Box
              sx={{
                mt: 1,
                display: "flex",
              }}
            >
              {/* 小見出し */}
              <Typography
                variant="h4"
                sx={{ ml: 1, fontSize: "20px", flex: 1 }}
              >
                通学形態
              </Typography>

              {/* コンポーネント */}
              <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
                <InfoItem text={school.attendanceFrequency} />
                <InfoItem text={school.commutingStyle} />
              </Box>
            </Box>

            <Box
              sx={{
                mt: 1,
                display: "flex",
              }}
            >
              {/* 小見出し */}
              <Typography
                variant="h4"
                sx={{
                  ml: 1,
                  fontSize: "20px",
                  flex: 1,
                }}
              >
                県外移動
              </Typography>

              {/* コンポーネント */}
              <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
                <InfoItem
                  text={school.movingOutsideThePrefecture ? "あり" : "なし"}
                />
              </Box>
            </Box>

            <Box
              sx={{
                mt: 1,
                display: "flex",
              }}
            >
              {/* 小見出し */}
              <Typography
                variant="h4"
                sx={{ ml: 1, fontSize: "20px", flex: 1 }}
              >
                スクーリング
              </Typography>

              {/* コンポーネント */}
              <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
                <InfoItem text={school.schooling ? "あり" : "なし"} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
