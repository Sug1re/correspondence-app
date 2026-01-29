import { ToggleButton, ToggleButtonProps } from "@mui/material";

type Props = ToggleButtonProps & {
  label: string;
};

const getFontSize = (label: string) => {
  if (label.length > 11) return 9;
  if (label.length > 0) return 11;
  return 11;
};

export const CampusButton = ({ label, sx, ...props }: Props) => {
  return (
    <ToggleButton
      {...props}
      disableRipple
      sx={{
        width: "100%",
        height: 30,
        fontSize: getFontSize(label),
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
