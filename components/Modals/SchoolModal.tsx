import React from "react";
import { BaseModal } from "../Base/BaseModal";
import { Stack } from "@mui/material";
import { SchoolText } from "../Texts/SchoolText";
import { School } from "@/entities/school";

type Props = {
  opened: boolean;
  school?: School;
  onClose: () => void;
};

export const SchoolModal = ({ opened, onClose, school }: Props) => {
  if (!school) return null;
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
        }}
      >
        <SchoolText school={school} />
      </Stack>
    </BaseModal>
  );
};
