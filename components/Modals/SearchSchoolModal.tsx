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
        console.log("検索条件:", data);

        const query = new URLSearchParams();

        query.append("target", data.target);
        query.append("school", data.school);
        query.append("style", data.style);
        query.append("attendance", data.attendance);
        [data.schooling]
          .flat()
          .filter(Boolean)
          .forEach((item) => {
            query.append("schooling", item);
          });

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
        <SearchSchoolForm onClose={onClose} methodsRef={methodsRef} />
      </Stack>
    </BaseModal>
  );
};
