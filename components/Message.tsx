import React from "react";
import { Typography } from "@mui/material";

type Props = {
  message: string;
};

export const Message = ({ message }: Props) => {
  return (
    <Typography
      sx={{ textAlign: "center", fontWeight: 600, mt: 4, color: "#666666" }}
    >
      {message}
    </Typography>
  );
};
