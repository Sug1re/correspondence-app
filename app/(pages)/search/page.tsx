"use client";

import React, { useEffect } from "react";
import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { useSchools } from "@/hooks/useSchools";
import { useSearchParams } from "next/navigation";
import { Loading } from "@/components/Loading";
import { Message } from "@/components/Message";

export default function SearchPage() {
  const { schools = [], isLoading, isError, isEmpty } = useSchools();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading && !isError) {
      // クエリ取得
      // const totalFeeMin = Number(searchParams.get("totalFeeMin") || 0);
      // const totalFeeMax = Number(searchParams.get("totalFeeMax") || Infinity);
      const school = searchParams.get("school") || "";
      const style = searchParams.get("style") || "";
      const schooling = searchParams.get("schooling") || "";
      // const attendance = searchParams.get("attendance")
      // ? searchParams.get("attendance")!.split(",")
      // : [];

      // クライアント側でフィルタ
      const filteredSchools = schools.filter((s) => {
        // const matchFee = s.totalFee >= totalFeeMin && s.totalFee <= totalFeeMax;
        const matchSchool = school ? s.school === school : true;
        const matchStyle = style ? s.style === style : true;
        const matchSchooling = schooling ? s.schooling === schooling : true;
        // const matchAttendance =
        // attendance.length > 0
        // ? attendance.some((a) => s.attendance.includes(a))
        // : true;

        return (
          // matchFee &&
          matchSchool && matchStyle && matchSchooling
          // matchAttendance
        );
      });

      console.log("検索結果:", filteredSchools);
    }
  }, [schools, isLoading, isError, searchParams]);

  if (isLoading) return <Loading />;
  if (isError) return <Message message="データの取得に失敗しました。" />;
  if (isEmpty) return <Message message="データがありません。" />;

  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 4 }}></Stack>
      </Container>

      <ScrollToTopButton />
    </>
  );
}
