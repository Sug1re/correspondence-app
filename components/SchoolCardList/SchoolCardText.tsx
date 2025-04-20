"use client";

import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  Link,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { School } from "@/app/types/school";
import * as CustomHook from "@/hooks/index";

import * as Icon from "@/icons/index";

type SchoolCardTitleProps = {
  school: School;
};

const SchoolCardText: React.FC<SchoolCardTitleProps> = ({ school }) => {
  // カスタムフックuseModal
  const { openModalId, handleOpen, handleClose } = CustomHook.useModal();
  return (
    <>
      <Box sx={{ my: 1, mx: 0.5 }}>
        <Link
          href={school.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            fontSize: "13px",
            ml: 1,
            textDecoration: "none",
            fontWeight: 600,
            color: "text.primary",
            "&:hover": {
              color: "primary.main",
              textDecoration: "underline",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pr: 0.5,
            }}
          >
            <Icon.LinkIcon />
          </Box>
          {school.name}
        </Link>

        <Typography
          sx={{
            fontSize: "8px",
            ml: 1,
          }}
        >
          {school.course || "コース情報なし"}

          {school.attendanceFrequency?.length > 0 && (
            <Box component="span" sx={{ ml: 0.5, color: "#003399" }}>
              {school.attendanceFrequency.map((freq, index) => (
                <Box key={index} component="span" sx={{ mr: 0.5 }}>
                  #{freq}
                </Box>
              ))}
            </Box>
          )}
        </Typography>

        <Card
          sx={{
            m: 0.5,
            borderRadius: 2,
            border: `0.5px solid #FF6600`,
          }}
        >
          <Typography
            sx={{
              pt: 0.5,
              ml: 2,
              fontSize: "8px",
            }}
          >
            3年間の学費総額
          </Typography>
          <Typography
            sx={{
              ml: 2,
              fontWeight: 600,
              fontSize: "12px",
            }}
          >
            ￥{school.totalTuitionFee.toLocaleString("ja-JP")}
          </Typography>

          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              size="small"
              sx={{
                width: "80vh",
                borderRadius: 2,
                backgroundColor: "#FF6600",
                color: "#FFFFFF",
                boxShadow: "0px 4px 10px rgba(255, 102, 0, 0.4)",
              }}
              onClick={() => handleOpen(school.id)}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 600,
                }}
              >
                詳細
              </Typography>
            </Button>
          </CardActions>
        </Card>

        <Modal
          open={openModalId === school.id}
          onClose={handleClose}
          BackdropProps={{
            sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          }}
        >
          <Card
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 330,
              bgcolor: "background.paper",
              px: 4,
              py: 2,
              borderRadius: 3,
              border: `0.5px solid #FF6600`,
            }}
          >
            {/* 閉じるボタン */}
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 1,
                  gap: 1,
                  borderRadius: 2,
                  backgroundColor: "#FF6600",
                  width: "80%",
                }}
              >
                学費総額の内訳
                <Icon.ChevronDownIcon />
              </Typography>
              <Button
                onClick={handleClose}
                sx={{ color: "#000000", width: "20%" }}
              >
                <Icon.CloseIcon />
              </Button>
            </Box>

            {/* 学費情報 */}
            <Table>
              <TableBody>
                <TableRow
                  sx={{
                    "& td": { borderBottom: "1px solid #003399" },
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    初年次の学費
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    ￥{school.firstYearFee.toLocaleString("JA-JP")}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "& td": { borderBottom: "1px solid #003399" },
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    二年次の学費
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    ￥{school.secondYearFee.toLocaleString("JA-JP")}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "& td": { borderBottom: "1px solid #003399" },
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    三年次の学費
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    ￥{school.thirdYearFee.toLocaleString("JA-JP")}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "& td": { borderBottom: "1px solid #003399" },
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    受験料
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    ￥{school.testFee.toLocaleString("JA-JP")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Modal>
      </Box>
    </>
  );
};

export default SchoolCardText;
