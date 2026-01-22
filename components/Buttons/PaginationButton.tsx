import { Box, Pagination } from "@mui/material";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const PaginationButton = ({ page, totalPages, onChange }: Props) => {
  if (totalPages <= 1) return null;

  return (
    <Box>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => onChange(value)}
        variant="outlined"
        shape="rounded"
        size="medium"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#b0c4de",
            border: "1.5px solid",
            borderColor: "#b0c4de",
            mx: 1,
            "&:hover": { backgroundColor: "inherit" },
          },

          "& .MuiPaginationItem-root.Mui-selected": {
            color: "#FFFFFF",
            backgroundColor: "#060666ff",
            borderColor: "#060666ff",
            "&:hover": { backgroundColor: "#060666ff" },
          },

          "& .MuiPaginationItem-previousNext": {
            color: "#FFFFFF",
            backgroundColor: "#b0c4de",
            borderColor: "#b0c4de",
            "&:hover": { backgroundColor: "#b0c4de" },
          },

          "& .MuiTouchRipple-root": { display: "none" },
        }}
      />
    </Box>
  );
};
