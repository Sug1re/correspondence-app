import React from "react";
import Link from "next/link";
import { Box, Card } from "@mui/material";
import { useSchools } from "@/hooks/useSchools";
import { Loading } from "../Loading";
import { Message } from "../message";

export const SchoolCard = () => {
  const { schools, isLoading, isError, isEmpty } = useSchools();

  if (isLoading) return <Loading />;

  if (isError) {
    return <Message message="データの取得に失敗しました。" />;
  }

  if (isEmpty) {
    return <Message message="データがありません。" />;
  }

  return (
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
  );
};
