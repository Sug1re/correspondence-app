import { Box, Typography } from "@mui/material";
import { Course } from "@/entities/course";
import { useSetting } from "@/context/SettingContext";
import { getAdmissionValue } from "@/lib/getTotalTuition";

import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";

type Props = {
  course: Course;
};

export const TuitionText = ({ course }: Props) => {
  const c = course;
  const { settings } = useSetting();

  const hasAnyAdmission = [
    c.AprilAdmission,
    c.JulyAdmission,
    c.OctoberAdmission,
    c.JanuaryAdmission,
  ].some(Boolean);

  return (
    <Box
      sx={{
        mx: { xs: 2, sm: 10 },
        my: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {c.CorrespondenceTuition1st && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            通信制課程の1年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(c.CorrespondenceTuition1st).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {c.CorrespondenceTuition2nd && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            通信制課程の2年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(c.CorrespondenceTuition2nd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {c.CorrespondenceTuition3rd && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            通信制課程の3年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(c.CorrespondenceTuition3rd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {hasAnyAdmission && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            {settings.admissionSeason}入学の費用
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(
              getAdmissionValue(c, settings.admissionSeason),
            ).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {c.week1Tuition1st && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            週1＋コースの1年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(c.week1Tuition1st).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {c.week1Tuition2nd && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            週1＋コースの2年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(c.week1Tuition2nd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {c.week1Tuition3rd && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            週1＋コースの3年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(c.week1Tuition3rd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {c.week3Tuition1st && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            週3コースの1年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(c.week3Tuition1st).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {c.week3Tuition2nd && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            週3コースの2年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(c.week3Tuition2nd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {c.week3Tuition3rd && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            週3コースの3年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(c.week3Tuition3rd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {c.week5Tuition1st && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            週5コースの1年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(c.week5Tuition1st).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {c.week5Tuition2nd && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            週5コースの2年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(c.week5Tuition2nd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {c.week5Tuition3rd && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            週5コースの3年次の学費
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyYenIcon style={{ fontSize: 18 }} />
            {Number(c.week5Tuition3rd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
