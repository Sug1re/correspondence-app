import React from "react";
import { BaseModal } from "../Base/BaseModal";
import { Stack, Typography } from "@mui/material";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const SchoolModal = ({ opened, onClose }: Props) => {
  return (
    <BaseModal
      title="負担額の内訳"
      color="orange"
      footer={false}
      isOpen={opened}
      onClose={onClose}
    >
      <Stack
        sx={{
          maxHeight: 300,
          overflowY: "auto",
          alignItems: "center",
        }}
      >
        <Typography>こんにちは</Typography>
      </Stack>
    </BaseModal>
  );
};
