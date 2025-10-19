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
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
};

export const BaseModal = ({
  children,
  title,
  isOpen,
  onClose,
  onSubmit,
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
              bgcolor: "#003399",
            }}
          >
            <Typography
              sx={{
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

          <Box
            sx={{
              py: 1,
              display: "flex",
              justifyContent: "center",
              bottom: 0,
              backgroundColor: "#fff",
              zIndex: 10,
              borderTop: "1px solid #ddd",
            }}
          >
            <Button
              onClick={onSubmit}
              type="submit"
              sx={{
                borderRadius: 4,
                color: "#fff",
                backgroundColor: "#003399",
                fontWeight: "bold",
                width: "60%",
                transition: "transform 0.2s",
                "&:hover": {
                  backgroundColor: "#003399",
                  transform: "scale(0.95)",
                },
              }}
              disableRipple
            >
              検索
            </Button>
          </Box>
        </Card>
      </MuiModal>
    </>
  );
};
