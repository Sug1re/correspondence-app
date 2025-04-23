"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleBack}
        sx={{
          mt: 2,
          pr: 1,
          fontWeight: 600,
          color: "#FFFFFF",
          backgroundColor: "#003399",
          boxShadow: 2,
          minWidth: "70px",
          clipPath: "polygon(0% 50%, 25% 0%, 100% 0%, 100% 100%, 25% 100%)",
          "&:hover": {
            backgroundColor: "#335d99",
          },
        }}
      >
        戻る
      </Button>
    </>
  );
};

export default BackButton;
