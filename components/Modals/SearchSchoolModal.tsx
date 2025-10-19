import React, { useRef } from "react";
import { TestForm } from "../Forms/TestForm";
import { BaseModal } from "../Base/BaseModal";
import { Stack } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { TestSchema } from "@/lib/validation/TestSchema";
import { z } from "zod";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const SearchSchoolModal = ({ opened, onClose }: Props) => {
  const methodsRef = useRef<UseFormReturn<z.infer<typeof TestSchema>> | null>(
    null
  );

  const onSubmit = () => {
    if (methodsRef.current) {
      methodsRef.current.handleSubmit((data) => {
        console.log("外部からSubmit:", data);
        onClose();
      })();
    }
  };

  return (
    <BaseModal
      title="学校を検索"
      isOpen={opened}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <Stack
        sx={{
          maxHeight: 300,
          overflowY: "auto",
          alignItems: "center",
        }}
      >
        <TestForm onClose={onClose} methodsRef={methodsRef} />
      </Stack>
    </BaseModal>
  );
};
