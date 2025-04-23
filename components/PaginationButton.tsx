import React from "react";
import { Button, Typography, Box } from "@mui/material";

type PaginationButtonsProps = {
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

const PaginationButton: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          sx={{
            fontWeight: 600,
            border: `1px solid #003399`,
            color: "#003399",
            backgroundColor: "#FFFFFF",
            boxShadow: 2,
            transition: " 0.3s ease",
            "&:hover": {
              backgroundColor: "#E6E6FF",
            },
          }}
        >
          前へ
        </Button>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          {currentPage} / {totalPages}
        </Typography>
        <Button
          variant="outlined"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          sx={{
            fontWeight: 600,
            border: `1px solid #FF6600`,
            color: "#FF6600",
            backgroundColor: "#FFFFFF",
            boxShadow: 2,
            transition: " 0.3s ease",
            "&:hover": {
              backgroundColor: "#FFE5CC",
            },
          }}
        >
          次へ
        </Button>
      </Box>
    </>
  );
};

export default PaginationButton;
