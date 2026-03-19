import { Box, Typography } from "@mui/material";

import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import { Course } from "@/entities/course";

type Props = {
  course: Course;
};

export const TuitionText = ({ course }: Props) => {
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
      {course.CorrespondenceTuition1st && (
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
            {Number(course.CorrespondenceTuition1st).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {course.CorrespondenceTuition2nd && (
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
            {Number(course.CorrespondenceTuition2nd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {course.CorrespondenceTuition3rd && (
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
            {Number(course.CorrespondenceTuition3rd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {course.week1Tuition1st && (
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
            {Number(course.week1Tuition1st).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {course.week1Tuition2nd && (
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
            {Number(course.week1Tuition2nd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {course.week1Tuition3rd && (
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
            {Number(course.week1Tuition3rd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {course.week3Tuition1st && (
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
            {Number(course.week3Tuition1st).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {course.week3Tuition2nd && (
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
            {Number(course.week3Tuition2nd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {course.week3Tuition3rd && (
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
            {Number(course.week3Tuition3rd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {course.week5Tuition1st && (
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
            {Number(course.week5Tuition1st).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {course.week5Tuition2nd && (
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
            {Number(course.week5Tuition2nd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
      {course.week5Tuition3rd && (
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
            {Number(course.week5Tuition3rd).toLocaleString("ja-JP")}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
