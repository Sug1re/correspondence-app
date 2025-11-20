import React from "react";
import { BaseModal } from "../Base/BaseModal";
import { Stack } from "@mui/material";
import { CourseText } from "../Texts/CourseText";
import { School } from "@/entities/school";

type Props = {
  opened: boolean;
  school?: School;
  onClose: () => void;
};

export const CourseModal = ({ opened, school, onClose }: Props) => {
  if (!school) return null;
  return (
    <BaseModal
      title="コースの情報"
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
        <CourseText school={school} />
      </Stack>
    </BaseModal>
  );
};
