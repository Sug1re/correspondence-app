import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

interface HeartIconProps extends SvgIconProps {
  filled?: boolean;
  fillColor?: string;
}

const BookmarkIcon: React.FC<HeartIconProps> = ({
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
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
      />
    </SvgIcon>
  );
};

export default BookmarkIcon;
