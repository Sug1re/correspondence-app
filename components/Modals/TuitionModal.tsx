import React from "react";
import { BaseModal } from "../Base/BaseModal";
import { Stack } from "@mui/material";
import { TuitionText } from "../Texts/TuitionText";
import { School } from "@/entities/school";

type Props = {
  opened: boolean;
  school?: School;
  onClose: () => void;
  transferValue?: string | null;
  transferLabel?: string | null;
};

export const TuitionModal = ({
  opened,
  school,
  onClose,
  transferValue,
  transferLabel,
}: Props) => {
  if (!school) return null;
  return (
    <BaseModal
      title="負担額の内訳"
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
        <TuitionText
          school={school}
          transferValue={transferValue}
          transferLabel={transferLabel}
        />
      </Stack>
    </BaseModal>
  );
};
