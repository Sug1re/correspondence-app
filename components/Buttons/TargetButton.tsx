"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { HEADER_HEIGHT } from "@/lib/constants";

export const TargetButton = () => {
  const router = useRouter();

  const onEntrance = () => {
    router.push("/entrance");
  };
  const onTransfer = () => {
    router.push("/transfer");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          size="large"
          onClick={onEntrance}
          sx={{
            borderRadius: 2,
            backgroundColor: "#FF6600",
            color: "#FFFFFF",
            boxShadow: 2,
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(0.95)",
              backgroundColor: "#FF6600",
            },
          }}
          disableRipple
        >
          <Typography
            sx={{
              m: 1,
              gap: 1,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            入学者向け
          </Typography>
        </Button>
        <Button
          size="large"
          onClick={onTransfer}
          sx={{
            borderRadius: 2,
            backgroundColor: "#003399",
            color: "#FFFFFF",
            boxShadow: 2,
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(0.95)",
              backgroundColor: "#003399",
            },
          }}
          disableRipple
        >
          <Typography
            sx={{
              m: 1,
              gap: 1,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            転入者向け
          </Typography>
        </Button>
      </Box>
    </>
  );
};
