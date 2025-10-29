"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  entranceTotalTuition,
  transferTotalTuition,
  variableTransferTotalTuition,
} from "@/lib/constants";
import { TuitionModal } from "../Modals/TuitionModal";
import { TransferTuitionModal } from "../Modals/TransferTuitionModal";
import { useDisclosure } from "@mantine/hooks";
import { School } from "@/entities/school";
import { BookmarkButton } from "../Buttons/BookmarkButton";

import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

interface Props {
  school: School[];
}

export const SchoolCard = ({ school }: Props) => {
  const [isOpen, handlers] = useDisclosure(false);
  const [isOpenTuitionModal, tuitionModalHandlers] = useDisclosure(false);

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedTransFerTuition, setSelectedTransFerTuition] = useState<
    string | null
  >(null);

  const [selectedTransferValue, setSelectedTransferValue] = useState<
    string | null
  >(null);

  const [selectedTransferLabel, setSelectedTransferLabel] = useState<
    string | null
  >(null);

  const openTransferTuitionModal = (school: School) => {
    setSelectedSchool(school);

    setSelectedTransFerTuition(transferTotalTuition(school));
    handlers.open();
  };

  const openTuitionModal = (school: School) => {
    setSelectedSchool(school);
    tuitionModalHandlers.open();
  };

  return (
    <>
      <Grid container spacing={2}>
        {school.map((school, index) => (
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
              {/* loadingを仕込む */}
              {school.picture ? (
                <Link
                  href={school.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Box
                    component="img"
                    src={school.picture}
                    alt={school.name}
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                    }}
                  />
                </Link>
              ) : null}

              <Box
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 1,
                  zIndex: 2,
                }}
              >
                <BookmarkButton schoolId={school.schoolId} />
              </Box>

              <Stack>
                <Box sx={{ m: 1, fontWeight: 600 }}>
                  <Box sx={{ px: 1 }}>
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
                        {school.name}
                      </Typography>
                    </Link>

                    <Box sx={{ display: "flex" }}>
                      <Typography sx={{ fontSize: "8px", fontWeight: 600 }}>
                        {school.course}
                      </Typography>
                      {school.attendance && school.attendance.length > 0 && (
                        <Typography
                          component="span"
                          sx={{ ml: 0.5, color: "#003399", fontSize: "8px" }}
                        >
                          {school.attendance
                            .split(",")
                            .map((freq) => freq.trim())
                            .map((freq) => `#${freq}`)
                            .join(" ")}
                        </Typography>
                      )}
                      {school.subAttendance && (
                        <Typography
                          sx={{ ml: 0.5, color: "#003399", fontSize: "8px" }}
                        >
                          #{school.subAttendance}
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
                        {school.target === "新入学"
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
                        {school.target === "新入学"
                          ? entranceTotalTuition(school)
                          : selectedTransFerTuition ||
                            transferTotalTuition(school)}
                      </Typography>
                      {school.target === "転入学" && (
                        <>
                          <IconButton
                            size="small"
                            sx={{ color: "#003399" }}
                            onClick={() => openTransferTuitionModal(school)}
                            disableRipple
                          >
                            <InfoOutlineIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </>
                      )}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "8px",
                        }}
                      >
                        就学支援金を考慮していない
                        <br />
                        負担額となります。
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => openTuitionModal(school)}
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
          </Grid>
        ))}
      </Grid>

      <TransferTuitionModal
        opened={isOpen}
        onClose={handlers.close}
        school={selectedSchool!}
        onSelect={(value: string, label: string) => {
          setSelectedTransferValue(value);
          setSelectedTransferLabel(label);
          const total = variableTransferTotalTuition(selectedSchool!, value);
          setSelectedTransFerTuition(total);
        }}
      />

      <TuitionModal
        opened={isOpenTuitionModal}
        onClose={tuitionModalHandlers.close}
        school={selectedSchool!}
        transferValue={selectedTransferValue}
        transferLabel={selectedTransferLabel}
      />
    </>
  );
};
