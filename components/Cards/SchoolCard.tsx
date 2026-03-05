"use client";

import React, { useState } from "react";
import {
  Box,
  // Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { monthlyData, variableTransferTotalTuition } from "@/lib/constants";
import { TuitionModal } from "../Modals/TuitionModal";
import { TransferTuitionModal } from "../Modals/TransferTuitionModal";
import { School } from "@/entities/school";
import { BookmarkButton } from "../Buttons/BookmarkButton";

import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

interface Props {
  school: School[];
}

export const SchoolCard = ({ school }: Props) => {
  const [openTuitionModalId, setOpenTuitionModalId] = useState<string | null>(
    null
  );
  const [openTransferModalId, setOpenTransferModalId] = useState<string | null>(
    null
  );

  const [transferValueMap, setTransferValueMap] = useState<
    Record<string, string>
  >({});
  const [transferLabelMap, setTransferLabelMap] = useState<
    Record<string, string>
  >({});

  // const openTuitionModal = (schoolId: string) => {
  //   setOpenTuitionModalId(schoolId);
  // };

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
      <Box>
        <Grid container spacing={2}>
          {school.map((s) => {
            const isTuitionOpen = openTuitionModalId === s.schoolId;
            const isTransferOpen = openTransferModalId === s.schoolId;
            const selectedTransferValue = transferValueMap[s.schoolId] || null;
            const selectedTransferLabel = transferLabelMap[s.schoolId] || null;
            const transferTotal =
              selectedTransferValue !== null
                ? variableTransferTotalTuition(s, selectedTransferValue)
                : Number(s.transferTuition).toLocaleString("ja-JP");

            return (
              <Grid key={s.schoolId} size={12}>
                <Card
                  sx={{
                    boxShadow: 5,
                    borderRadius: 2,
                    border: `0.5px solid #060666ff`,
                    position: "relative",
                  }}
                >
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
                        <Box sx={{ display: "flex" }}>
                          <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                            {s.course}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 8,
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
                              ? Number(s.entranceTuition).toLocaleString(
                                  "ja-JP"
                                )
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

                        {/* <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex",
                          alignItems: "center",
                        }}
                      >
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
                              fontSize: 12,
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
                      </Box> */}
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
      </Box>
    </>
  );
};
