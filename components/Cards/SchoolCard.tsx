"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  getDriveImageUrl,
  monthlyData,
  variableTransferTotalTuition,
} from "@/lib/constants";
import { TuitionModal } from "../Modals/TuitionModal";
import { TransferTuitionModal } from "../Modals/TransferTuitionModal";
import { School } from "@/entities/school";
import { BookmarkButton } from "../Buttons/BookmarkButton";

import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { CourseModal } from "../Modals/CourseModal";

interface Props {
  school: School[];
}

export const SchoolCard = ({ school }: Props) => {
  const [openCourseModalId, setOpenCourseModalId] = useState<string | null>(
    null
  );
  const [openTuitionModalId, setOpenTuitionModalId] = useState<string | null>(
    null
  );
  const [openTransferModalId, setOpenTransferModalId] = useState<string | null>(
    null
  );

  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const [transferValueMap, setTransferValueMap] = useState<
    Record<string, string>
  >({});
  const [transferLabelMap, setTransferLabelMap] = useState<
    Record<string, string>
  >({});

  const openCourseModal = (schoolId: string) => {
    setOpenCourseModalId(schoolId);
  };

  const closeCourseModal = () => {
    setOpenCourseModalId(null);
  };

  const openTuitionModal = (schoolId: string) => {
    setOpenTuitionModalId(schoolId);
  };

  const closeTuitionModal = () => {
    setOpenTuitionModalId(null);
  };

  const openTransferModal = (schoolId: string) => {
    setOpenTransferModalId(schoolId);
  };

  const closeTransferModal = () => {
    setOpenTransferModalId(null);
  };

  return (
    <>
      <Grid container spacing={2}>
        {school.map((s) => {
          const isCourseOpen = openCourseModalId === s.schoolId;
          const isTuitionOpen = openTuitionModalId === s.schoolId;
          const isTransferOpen = openTransferModalId === s.schoolId;
          const selectedTransferValue = transferValueMap[s.schoolId] || null;
          const selectedTransferLabel = transferLabelMap[s.schoolId] || null;
          const transferTotal =
            selectedTransferValue !== null
              ? variableTransferTotalTuition(s, selectedTransferValue)
              : Number(s.transferTuition).toLocaleString("ja-JP");

          const isImageLoaded = loadedImages[s.schoolId] || false;

          return (
            <Grid key={s.schoolId} size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  boxShadow: 5,
                  borderRadius: 2,
                  border: `0.5px solid #FF6600`,
                  position: "relative",
                }}
              >
                <Link href={s.url} target="_blank" rel="noopener noreferrer">
                  <Box
                    sx={{ position: "relative", width: "100%", height: 200 }}
                  >
                    {!isImageLoaded && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "#f9f9f9",
                        }}
                      >
                        <CircularProgress size={40} thickness={5} />
                      </Box>
                    )}

                    <Box
                      component="img"
                      src={getDriveImageUrl(s)}
                      alt={s.name}
                      sx={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        objectPosition: "center",
                        opacity: isImageLoaded ? 1 : 0,
                        transition: "opacity 0.4s ease-in-out",
                      }}
                      onLoad={() =>
                        setLoadedImages((prev) => ({
                          ...prev,
                          [s.schoolId]: true,
                        }))
                      }
                    />
                  </Box>
                </Link>

                <Box
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 1,
                    zIndex: 2,
                  }}
                >
                  <BookmarkButton schoolId={s.schoolId} />
                </Box>

                <Stack>
                  <Box sx={{ m: 1, fontWeight: 600 }}>
                    <Box sx={{ px: 1 }}>
                      <Link
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography
                          sx={{
                            display: "inline-block",
                            "&:hover": {
                              color: "#1976d2",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {s.name}
                        </Typography>
                      </Link>

                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ fontSize: "8px", fontWeight: 600 }}>
                          {s.course}
                        </Typography>
                        {s.attendance && (
                          <Typography
                            component="span"
                            sx={{ ml: 0.5, color: "#003399", fontSize: "8px" }}
                          >
                            #{s.attendance}
                          </Typography>
                        )}
                        {s.subAttendance && (
                          <Typography
                            sx={{ ml: 0.5, color: "#003399", fontSize: "8px" }}
                          >
                            #{s.subAttendance}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        px: 1,
                        py: 1.5,
                        bgcolor: "#FFF4E5",
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <Typography
                          sx={{
                            fontSize: "8px",
                            fontWeight: 600,
                          }}
                        >
                          {s.target === "新入学"
                            ? "3年間の負担額"
                            : "1年目の負担額"}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <CurrencyYenIcon style={{ fontSize: 18 }} />
                          {s.target === "新入学"
                            ? Number(s.entranceTuition).toLocaleString("ja-JP")
                            : transferTotal}
                        </Typography>
                        {monthlyData(s) && (
                          <IconButton
                            size="small"
                            sx={{ color: "#003399" }}
                            onClick={() => openTransferModal(s.schoolId)}
                            disableRipple
                          >
                            <InfoOutlineIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        )}
                      </Box>

                      <Box sx={{ mb: 1 }}>
                        <Typography sx={{ fontSize: "8px" }}>
                          就学支援金を考慮していない
                          <br />
                          負担額となります。
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() => openCourseModal(s.schoolId)}
                          sx={{
                            borderRadius: 2,
                            backgroundColor: "#FF6600",
                            color: "#FFFFFF",
                            boxShadow: 1,
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": {
                              transform: "scale(0.95)",
                              backgroundColor: "#FF6600",
                            },
                          }}
                          disableRipple
                        >
                          <Typography
                            sx={{
                              m: 1,
                              gap: 1,
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            コースの情報
                            <ArrowForwardIosIcon
                              style={{ fontSize: 16, marginLeft: 4 }}
                            />
                          </Typography>
                        </Button>

                        <Button
                          size="small"
                          onClick={() => openTuitionModal(s.schoolId)}
                          sx={{
                            borderRadius: 2,
                            backgroundColor: "#FF6600",
                            color: "#FFFFFF",
                            boxShadow: 1,
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": {
                              transform: "scale(0.95)",
                              backgroundColor: "#FF6600",
                            },
                          }}
                          disableRipple
                        >
                          <Typography
                            sx={{
                              m: 1,
                              gap: 1,
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            料金を表示
                            <ArrowForwardIosIcon
                              style={{ fontSize: 16, marginLeft: 4 }}
                            />
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </Card>

              {s.target === "転入学" && isTransferOpen && (
                <TransferTuitionModal
                  opened={true}
                  onClose={closeTransferModal}
                  school={s}
                  onSelect={(value: string, label: string) => {
                    setTransferValueMap((prev) => ({
                      ...prev,
                      [s.schoolId]: value,
                    }));
                    setTransferLabelMap((prev) => ({
                      ...prev,
                      [s.schoolId]: label,
                    }));
                  }}
                />
              )}

              {isCourseOpen && (
                <CourseModal
                  opened={true}
                  onClose={closeCourseModal}
                  school={s}
                />
              )}

              {isTuitionOpen && (
                <TuitionModal
                  opened={true}
                  onClose={closeTuitionModal}
                  school={s}
                  transferValue={selectedTransferValue}
                  transferLabel={selectedTransferLabel}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
