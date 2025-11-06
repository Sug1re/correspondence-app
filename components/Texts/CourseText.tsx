import React from "react";
import { Box, Typography } from "@mui/material";
import { School } from "@/entities/school";

type Props = {
  school: School;
};

export const CourseText = ({ school }: Props) => {
  return (
    <Box
      sx={{
        mx: { xs: 2, sm: 10 },
        my: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {school.content && (
        <Typography
          sx={{
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
          }}
        >
          {school.content}
        </Typography>
      )}
    </Box>
  );
};
