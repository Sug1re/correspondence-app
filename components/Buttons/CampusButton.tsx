import { ToggleButton, ToggleButtonProps } from "@mui/material";

type Props = ToggleButtonProps & {
  label: string;
};

export const CampusButton = ({ label, sx, ...props }: Props) => {
  return (
    <ToggleButton
      {...props}
      disableRipple
      sx={{
        width: "100%",
        height: 35,
        fontSize: { xs: 12, sm: 14 },
        lineHeight: 1,
        padding: "0 6px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: "#060666ff",
        border: "1px solid #060666ff",

        "&.Mui-selected": {
          bgcolor: "#060666ff",
          color: "#fff",
        },
        "&.Mui-selected:hover": {
          bgcolor: "#060666ff",
          color: "#fff",
        },
        "&:hover": {
          bgcolor: "transparent",
        },

        ...sx,
      }}
    >
      {label}
    </ToggleButton>
  );
};
