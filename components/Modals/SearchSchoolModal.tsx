"use client";

import React, { useRef } from "react";
import { TestForm } from "../Forms/TestForm";
import { BaseModal } from "../Base/BaseModal";
import { Stack } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { SearchSchoolSchema } from "@/lib/validation/SearchSchoolSchema";
import { z } from "zod";
import { SearchSchoolFormValues } from "@/entities/form";
import { useRouter } from "next/navigation";

type Props = {
  opened: boolean;
  onSearch?: (data: SearchSchoolFormValues) => void;
  target?: "entrance" | "transfer";
  onClose: () => void;
};

export const SearchSchoolModal = ({
  opened,
  onSearch,
  target,
  onClose,
}: Props) => {
  const methodsRef = useRef<UseFormReturn<
    z.infer<typeof SearchSchoolSchema>
  > | null>(null);
  const router = useRouter();

  const onSubmit = () => {
    if (methodsRef.current) {
      methodsRef.current.handleSubmit((data) => {
        const { school, style, target, schooling } = data;

        console.log("Submit data:");
        console.log("target:", target);
        console.log("school:", school);
        console.log("style:", style);
        console.log("schooling:", schooling);
        const query = new URLSearchParams();

        query.append("target", data.target);
        query.append("school", data.school);
        query.append("style", data.style);
        query.append("schooling", data.schooling);

        router.push(`/search?${query.toString()}`);

        onSearch?.(data);
        onClose();
      })();
    }
  };

  return (
    <BaseModal
      title="学校を検索"
      color="blue"
      footer={true}
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
        <TestForm onClose={onClose} methodsRef={methodsRef} target={target} />
      </Stack>
    </BaseModal>
  );
};
