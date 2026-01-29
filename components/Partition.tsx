import { Box } from "@mui/material";

type Props = {
  width: string | number;
};

export const Partition = ({ width }: Props) => {
  const partitionStyle = {
    content: '""',
    position: "absolute",
    right: 0,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    height: "1.5px",
    width: width,
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
