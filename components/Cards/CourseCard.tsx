"use client";

import React, { useState } from "react";
import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import { TuitionModal } from "../Modals/TuitionModal";
import { useResponsive } from "@/hooks/useResponsive";
import { Course } from "@/entities/course";
import { useSetting } from "@/context/SettingContext";
import { BookmarkButton } from "../Buttons/BookmarkButton";
import { getTotalTuition } from "@/lib/getTotalTuition";

import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  course: Course[];
}

export const CourseCard = ({ course }: Props) => {
  const { settings } = useSetting();
  const { itemsGrid } = useResponsive();
  const [openTuitionModalId, setOpenTuitionModalId] = useState<string | null>(
    null,
  );

  const openTuitionModal = (Id: string) => {
    setOpenTuitionModalId(Id);
  };

  const closeTuitionModal = () => {
    setOpenTuitionModalId(null);
  };

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          {course.map((c) => {
            const isTuitionOpen = openTuitionModalId === c.Id;

            const totalTuition = getTotalTuition(
              c,
              settings?.admissionSeason ?? "4月",
            );

            return (
              <Grid key={c.Id} size={itemsGrid}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Card
                    sx={{
                      boxShadow: 1,
                      borderRadius: 1,
                      border: `0.5px solid rgba(0, 51, 153, 0.1)`,
                      position: "relative",
                      height: "80px",
                      width: "340px",
                      pb: 4,
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: -7,
                        right: 8,
                        zIndex: 2,
                      }}
                    >
                      <BookmarkButton schoolId={c.Id} />
                    </Box>

                    <Stack>
                      <Box sx={{ p: 1, fontWeight: 600 }}>
                        <Box sx={{ display: "flex" }}>
                          <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                            {c.Course}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: 0.5,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 10,
                              fontWeight: 600,
                            }}
                          >
                            {c.AdmissionType === "新入学"
                              ? "3年間の負担額"
                              : "1年目の負担額"}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              color: "#060666ff",
                            }}
                          >
                            <CurrencyYenIcon style={{ fontSize: 18 }} />
                            {totalTuition.toLocaleString("ja-JP")}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                          }}
                        >
                          <Button
                            size="small"
                            onClick={() => openTuitionModal(c.Id)}
                            sx={{
                              height: 30,
                              width: 100,
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              backgroundColor: "#9575CD",
                              color: "#FFFFFF",
                              boxShadow: 0.5,
                              transition: "transform 0.2s ease-in-out",
                              "&:hover": {
                                transform: "scale(0.95)",
                                backgroundColor: "#9575CD",
                              },
                            }}
                            disableRipple
                          >
                            <ExpandMoreIcon style={{ fontSize: 20 }} />

                            <Typography
                              sx={{
                                fontSize: 12,
                                gap: 1,
                                fontWeight: 600,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              金額を表示
                            </Typography>
                          </Button>
                          {c.AdmissionType === "新入学" && (
                            <Typography
                              sx={{
                                height: 22,
                                width: 90,
                                fontSize: 12,
                                color: "#FFFFFF",
                                fontWeight: 600,
                                backgroundColor: "#060666ff",
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              就学支援金適用
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Stack>
                  </Card>

                  {isTuitionOpen && (
                    <TuitionModal
                      opened={true}
                      onClose={closeTuitionModal}
                      course={c}
                    />
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};
