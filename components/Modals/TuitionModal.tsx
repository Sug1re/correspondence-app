import React from "react";
import { BaseModal } from "../Base/BaseModal";
import { Stack } from "@mui/material";
import { TuitionText } from "../Texts/TuitionText";
import { School } from "@/entities/school";

type Props = {
  opened: boolean;
  school?: School;
  onClose: () => void;
};

export const TuitionModal = ({ opened, onClose, school }: Props) => {
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
        <TuitionText school={school} />
      </Stack>
    </BaseModal>
  );
};
