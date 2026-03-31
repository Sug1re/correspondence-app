import React from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  Modal as MuiModal,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

type Props = {
  children: React.ReactNode;
  title: string;
  type: "default" | "search";
  footer: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  onClear?: () => void;
};

export const BaseModal = ({
  children,
  title,
  type,
  footer,
  isOpen,
  onClose,
  onSubmit,
  onClear,
}: Props) => {
  return (
    <>
      <MuiModal
        open={isOpen}
        onClose={onClose}
        BackdropProps={{
          sx: { backgroundColor: "rgba(170, 170, 170, 0.31)" },
        }}
      >
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "80vh",
            width: { xs: "90%", sm: "80%", md: "60%" },
            bgcolor: "background.paper",
            borderRadius: 4,
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              bgcolor: "#060666ff",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#FFFFFF",
                width: "50%",
                flexGrow: 5,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {title}
            </Typography>

            <Button
              onClick={onClose}
              sx={{
                color: "#000000",
                mr: 1,
                flexGrow: 1,

                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <CloseIcon style={{ color: "#ffffff", fontSize: "36" }} />
            </Button>
          </Box>

          <FormControl fullWidth>{children}</FormControl>

          {footer && (
            <Box
              sx={{
                py: 1,
                gap: 1,
                display: "flex",
                justifyContent: "center",
                bottom: 0,
                backgroundColor: "#fff",
                zIndex: 10,
                borderTop: "1px solid #ddd",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 4,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={onSubmit}
                  type="submit"
                  sx={{
                    width: "60%",
                    borderRadius: 2,
                    color: "#fff",
                    backgroundColor: "#060666ff",
                    fontWeight: "bold",
                    transition: "transform 0.2s",
                    "&:hover": {
                      backgroundColor: "#060666ff",
                      transform: "scale(0.95)",
                    },
                  }}
                  disableRipple
                >
                  OK
                </Button>
              </Box>

              {type === "search" && (
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={onClear}
                    type="button"
                    sx={{
                      borderRadius: 2,
                      color: "#ffffff",
                      backgroundColor: "#b0c4de",
                      fontWeight: "bold",
                      transition: "transform 0.2s",
                      "&:hover": {
                        scale: "0.95",
                      },
                    }}
                    disableRipple
                  >
                    クリア
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Card>
      </MuiModal>
    </>
  );
};
