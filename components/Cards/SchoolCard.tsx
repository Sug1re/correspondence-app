"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import { useSchools } from "@/hooks/useSchools";
import { Loading } from "../Loading";
import { Message } from "../Message";
import { totalTuition } from "@/lib/constants";
import { SchoolModal } from "../Modals/SchoolModal";
import { useDisclosure } from "@mantine/hooks";
import { School } from "@/entities/school";

import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { BookmarkButton } from "../Buttons/BookmarkButton";

export const SchoolCard = () => {
  const [isOpen, handlers] = useDisclosure(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const { schools, isLoading, isError, isEmpty } = useSchools();

  if (isLoading) return <Loading />;
  if (isError) return <Message message="データの取得に失敗しました。" />;
  if (isEmpty) return <Message message="データがありません。" />;

  const isOpenModal = (school: School) => {
    setSelectedSchool(school);
    handlers.open();
  };

  return (
    <>
      <Grid container spacing={2}>
        {schools.map((school, index) => (
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
                  alt={school.school}
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
                      {school.school}
                    </Typography>
                  </Link>

                  <Typography sx={{ fontSize: "8px" }}>
                    {school.course}
                    {school.attendanceWeek &&
                      school.attendanceWeek.length > 0 && (
                        <Box
                          component="span"
                          sx={{ ml: 0.5, color: "#003399" }}
                        >
                          {school.attendanceWeek
                            .split(",")
                            .map((freq) => freq.trim())
                            .map((freq) => `#${freq}`)
                            .join(" ")}
                        </Box>
                      )}
                  </Typography>
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

      <SchoolModal
        opened={isOpen}
        onClose={handlers.close}
        school={selectedSchool!}
      />
    </>
  );
};
