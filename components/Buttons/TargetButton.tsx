"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

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
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
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
            "@media (min-width:600px)": {
              px: 8,
              py: 3,
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
              "@media (min-width:600px)": {
                fontSize: 24,
              },
            }}
          >
            新入学向け
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
            "@media (min-width:600px)": {
              px: 8,
              py: 3,
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
              "@media (min-width:600px)": {
                fontSize: 24,
              },
            }}
          >
            転入学向け
          </Typography>
        </Button>
      </Box>
    </>
  );
};
