import React from "react";
import { Box } from "@mui/material";

export const Partition = () => {
  const partitionStyle = {
    content: '""',
    position: "absolute",
    right: 0,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    height: "1.5px",
    width: "90%",
    backgroundColor: "#adb1b7ff",
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          alignSelf: "stretch",
          "&::after": partitionStyle,
        }}
      />
    </>
  );
};
