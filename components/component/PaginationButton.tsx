import React from "react";
import { Button, Typography, Box } from "@mui/material";

type PaginationButtonsProps = {
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
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
          }}
        >
          前のページ
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
          }}
        >
          次のページ
        </Button>
      </Box>
    </>
  );
};

export default PaginationButtons;
