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
  season?: "entrance" | "transfer";
  onClose: () => void;
};

export const SearchSchoolModal = ({
  opened,
  onSearch,
  season,
  onClose,
}: Props) => {
  const methodsRef = useRef<UseFormReturn<
    z.infer<typeof SearchSchoolSchema>
  > | null>(null);
  const router = useRouter();

  const onSubmit = () => {
    if (methodsRef.current) {
      methodsRef.current.handleSubmit((data) => {
        const { school, style, season, schooling } = data;

        console.log("Submit data:");
        console.log("season:", season);
        console.log("school:", school);
        console.log("style:", style);
        console.log("schooling:", schooling);
        const query = new URLSearchParams();

        query.append("season", data.season);
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
        <SearchSchoolForm
          onClose={onClose}
          methodsRef={methodsRef}
          season={season}
        />
      </Stack>
    </BaseModal>
  );
};
