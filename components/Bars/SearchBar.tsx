"use client";

import React from "react";
// import * as Component from "@/components/index";
import { Box, Button, Card, Container, Modal, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDisclosure } from "@mantine/hooks";
import { TestForm } from "../Forms/TestForm";

const SearchBar = () => {
  const [isOpen, handlers] = useDisclosure(false);

  return (
    <>
      <Container maxWidth="md">
        <Card
          sx={{
            my: 2,
            borderRadius: 2,
            boxShadow: 3,
            border: `0.5px solid #003399`,
            height: 52,
          }}
        >
          <Box>
            <Button
              sx={{
                minWidth: "100%",
                justifyContent: "flex-start",
                color: "#003399",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onClick={handlers.open}
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
                <SearchIcon style={{ fontSize: 28 }} />
                検索
              </Typography>
            </Button>
          </Box>
        </Card>
      </Container>

      <Modal
        open={isOpen}
        onClose={handlers.close}
        BackdropProps={{
          sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        <TestForm onClose={handlers.close} />
        {/* <Component.SearchSchoolForm onClose={handlers.close} /> */}
      </Modal>
    </>
  );
};

export default SearchBar;
