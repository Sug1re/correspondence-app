import React from "react";
import { BaseModal } from "../Base/BaseModal";
import { Stack } from "@mui/material";
import { TuitionText } from "../Texts/TuitionText";
import { Course } from "@/entities/course";

type Props = {
  opened: boolean;
  course?: Course;
  onClose: () => void;
};

export const TuitionModal = ({ opened, course, onClose }: Props) => {
  if (!course) return null;
  return (
    <BaseModal
      title="負担額の内訳"
      type="default"
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
        <TuitionText course={course} />
      </Stack>
    </BaseModal>
  );
};
