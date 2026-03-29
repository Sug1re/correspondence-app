import { useMediaQuery } from "@mui/material";

export const useResponsive = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return {
    isMobile,
    itemsPerPage: isMobile ? 4 : 8 ,
    itemsGrid: isMobile ? 12 : 6,
  };
};