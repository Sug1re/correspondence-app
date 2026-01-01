"use client";

import React, { useRef } from "react";
import { SearchSchoolForm } from "../Forms/SearchSchoolForm";
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
  onClose: () => void;
};

export const SearchSchoolModal = ({ opened, onSearch, onClose }: Props) => {
  const methodsRef = useRef<UseFormReturn<
    z.infer<typeof SearchSchoolSchema>
  > | null>(null);
  const router = useRouter();

  const onSubmit = () => {
    if (methodsRef.current) {
      methodsRef.current.handleSubmit((data) => {
        const query = new URLSearchParams();
        data.target.forEach((item) => query.append("target", item));
        data.style.forEach((item) => query.append("style", item));
        data.attendance.forEach((item) => query.append("attendance", item));
        query.append("minFee", data.totalFee[0].toString());
        query.append("maxFee", data.totalFee[1].toString());

        router.push(`/search?${query.toString()}`);

        onSearch?.(data);
        onClose();
      })();
    }
  };

  return (
    <BaseModal
      title="コース絞り込み"
      color="blue"
      footer={true}
      isOpen={opened}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <Stack
        sx={{
          maxHeight: 400,
          overflowY: "auto",
          alignItems: "center",
        }}
      >
        <SearchSchoolForm onClose={onClose} methodsRef={methodsRef} />
      </Stack>
    </BaseModal>
  );
};
