import React from "react";
import * as CustomHook from "@/hooks";
import * as Icon from "@/icons/index";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

type HeaderBarProps = {
  totalTuitionFeeValue: [number, number];
  movingOutsideThePrefecture: boolean;
  commutingStyle: string;
  highSchool: string;
  attendanceFrequency: string[];
};

const HeaderBar: React.FC<HeaderBarProps> = ({
  totalTuitionFeeValue,
  movingOutsideThePrefecture,
  commutingStyle,
  highSchool,
  attendanceFrequency,
}) => {
  const { showHeader } = CustomHook.useHeaderBar();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          transition: "top 0.5s",
          top: showHeader ? 0 : "-128px",
          background: "#FFFFFF",
          padding: 0,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box sx={{ color: "#696969", gap: 1 }}>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon.YenIcon />
                <Typography sx={{ fontSize: "0.8rem", px: 0.5 }}>
                  ￥{totalTuitionFeeValue[0].toLocaleString("ja-JP")} 〜 ￥
                  {totalTuitionFeeValue[1].toLocaleString("ja-JP")}
                </Typography>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon.OfficeIcon />
                <Typography sx={{ fontSize: "0.8rem", px: 0.5 }}>
                  {movingOutsideThePrefecture ? "県外" : "県内"}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon.SchoolIcon />
                <Typography sx={{ fontSize: "0.8rem", px: 0.5 }}>
                  {commutingStyle}
                </Typography>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon.TvIcon />
                <Typography sx={{ fontSize: "0.8rem", px: 0.5 }}>
                  {highSchool}こんにちは
                </Typography>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon.CalendarIcon />
                <Typography sx={{ fontSize: "0.8rem", px: 0.5 }}>
                  {attendanceFrequency.join(",")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default HeaderBar;
