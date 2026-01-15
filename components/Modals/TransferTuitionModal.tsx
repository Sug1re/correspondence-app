import React from "react";
import { BaseModal } from "../Base/BaseModal";
import { Stack } from "@mui/material";
import { School } from "@/entities/school";
import { TransferTuitionText } from "../Texts/TransferTuitionText";

type Props = {
  opened: boolean;
  school?: School;
  onClose: () => void;
  onSelect: (value: string, label: string) => void;
};

export const TransferTuitionModal = ({
  opened,
  onClose,
  school,
  onSelect,
}: Props) => {
  if (!school) return null;
  return (
    <BaseModal
      title="負担額の見積り"
      type="default"
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
        <TransferTuitionText
          school={school}
          onClose={onClose}
          onSelect={onSelect}
        />
      </Stack>
    </BaseModal>
  );
};
