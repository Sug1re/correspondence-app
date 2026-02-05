import { Box, Typography } from "@mui/material";
import { Partition } from "../Partition";

type Props = {
  title: string;
};

export const BaseHeading = ({ title }: Props) => {
  return (
    <>
      <Box
        sx={{
          py: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ pb: 1, color: "#060666ff", fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Partition width={{ xs: "80%", sm: "40%" }} />
      </Box>
    </>
  );
};
