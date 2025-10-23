"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import { useGetSchools } from "@/hooks/useSchools";
import { Loading } from "../Loading";
import { Message } from "../Message";
import { totalTuition } from "@/lib/constants";
import { TuitionModal } from "../Modals/TuitionModal";
import { useDisclosure } from "@mantine/hooks";
import { School } from "@/entities/school";
import { useSchoolCount } from "@/hooks/useSchoolCount";

import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { BookmarkButton } from "../Buttons/BookmarkButton";

interface Props {
  school: School[];
  target?: "entrance" | "transfer";
}

export const SchoolCard = ({ school, target }: Props) => {
  const [isOpen, handlers] = useDisclosure(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const { isLoading, isError, isEmpty } = useGetSchools();

  const SCHOOLS = useMemo(() => {
    if (!school) return [];

    if (target === "entrance") {
      return school.filter((s) => s.target === "4月");
    }

    if (target === "transfer") {
      return school.filter((s) => s.target !== "4月");
    }

    return school;
  }, [school, target]);

  const schoolCount = useSchoolCount(SCHOOLS);

  if (isLoading) return <Loading />;
  if (isError) return <Message message="学校データの取得に失敗しました。" />;
  if (isEmpty) return <Message message="学校データがありません。" />;

  const isOpenModal = (school: School) => {
    setSelectedSchool(school);
    handlers.open();
  };

  return (
    <>
      <Typography sx={{ mb: 1, fontWeight: 600 }}>
        現在の学校データ数：{schoolCount} 件
      </Typography>

      <Grid container spacing={2}>
        {SCHOOLS.map((school, index) => (
          <Grid key={index} size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                boxShadow: 5,
                borderRadius: 2,
                border: `0.5px solid #FF6600`,
                position: "relative",
                mb: 2,
              }}
            >
              <Link href={school.url} target="_blank" rel="noopener noreferrer">
                <Box
                  component="img"
                  src={school.picture}
                  alt={school.schoolName}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                  }}
                />
              </Link>

              <Box
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 1,
                  zIndex: 2,
                }}
              >
                <BookmarkButton />
              </Box>

              <Stack>
                <Box sx={{ m: 1, fontWeight: 600 }}>
                  <Link
                    href={school.url}
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
                      {school.schoolName}
                    </Typography>
                  </Link>

                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ fontSize: "8px" }}>
                      {school.course}
                    </Typography>
                    {school.attendanceWeek &&
                      school.attendanceWeek.length > 0 && (
                        <Typography
                          component="span"
                          sx={{ ml: 0.5, color: "#003399", fontSize: "8px" }}
                        >
                          {school.attendanceWeek
                            .split(",")
                            .map((freq) => freq.trim())
                            .map((freq) => `#${freq}`)
                            .join(" ")}
                        </Typography>
                      )}
                    {school.attendanceMonth && (
                      <Typography
                        sx={{ ml: 0.5, color: "#003399", fontSize: "8px" }}
                      >
                        #{school.attendanceMonth}
                      </Typography>
                    )}
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
                        }}
                      >
                        負担額
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <CurrencyYenIcon style={{ fontSize: 18 }} />
                        {totalTuition(school)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        size="small"
                        onClick={() => isOpenModal(school)}
                        sx={{
                          borderRadius: 2,
                          backgroundColor: "#FF6600",
                          color: "#FFFFFF",
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
          </Grid>
        ))}
      </Grid>

      <TuitionModal
        opened={isOpen}
        onClose={handlers.close}
        school={selectedSchool!}
      />
    </>
  );
};
