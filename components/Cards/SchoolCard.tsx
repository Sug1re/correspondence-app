import React from "react";
import Link from "next/link";
import { Box, Card, Typography } from "@mui/material";
import { Loader } from "@mantine/core";
import useSWR from "swr";
import type { School } from "@/entities/school";

export const SchoolCard = () => {
  const { data, error, isLoading } = useSWR("/api/sheet");
  const schools = data?.data as School[];

  if (isLoading) {
    return (
      <>
        <Loader size="lg" color="blue" />
      </>
    );
  }

  if (error) {
    return (
      <Typography
        sx={{ textAlign: "center", fontWeight: 600, mt: 4, color: "#666666" }}
      >
        データの取得に失敗しました。
      </Typography>
    );
  }

  if (!schools || schools.length === 0) {
    return (
      <Typography
        sx={{ textAlign: "center", fontWeight: 600, mt: 4, color: "#666666" }}
      >
        データがありません。
      </Typography>
    );
  }
  return (
    <>
      <Card
        sx={{
          boxShadow: 5,
          borderRadius: 2,
          border: `0.5px solid #003399`,
          position: "relative",
        }}
      >
        <Link href={schools[0].url} target="_blank" rel="noopener noreferrer">
          <Box
            component="img"
            src={schools[0].picture}
            alt={schools[0].school}
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </Link>
      </Card>
    </>
  );
};
