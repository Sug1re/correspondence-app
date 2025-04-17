import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

interface HeartIconProps extends SvgIconProps {
  filled?: boolean;
  fillColor?: string;
}

const HeartIcon: React.FC<HeartIconProps> = ({
  filled = false,
  fillColor = "red",
  sx,
  ...props
}) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      sx={{
        width: 28,
        height: 28,
        cursor: props.onClick ? "pointer" : "default",
        color: filled ? fillColor : "inherit",
        ...sx,
      }}
      {...props}
    >
      <path
        fill={filled ? fillColor : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5C14.377 3.75 12.715 4.876 12 6.483 11.285 4.876 9.623 3.75 7.688 3.75 5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </SvgIcon>
  );
};

export default HeartIcon;
