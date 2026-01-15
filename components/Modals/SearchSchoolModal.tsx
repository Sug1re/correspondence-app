"use client";

import React, { useRef, useState } from "react";
import { z } from "zod";
import { SearchSchoolForm } from "../Forms/SearchSchoolForm";
import { BaseModal } from "../Base/BaseModal";
import { SearchSchoolSchema } from "@/lib/validation/SearchSchoolSchema";
import {
  DEFAULT_SEARCH_SCHOOL_VALUES,
  SearchSchoolFormValues,
} from "@/entities/form";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

import { Stack } from "@mui/material";

type Props = {
  opened: boolean;
  onSearch?: (data: SearchSchoolFormValues) => void;
  onClose: () => void;
};

export const SearchSchoolModal = ({ opened, onSearch, onClose }: Props) => {
  const [alignment, setAlignment] = useState("AND");

  const methodsRef = useRef<UseFormReturn<
    z.infer<typeof SearchSchoolSchema>
  > | null>(null);

  const router = useRouter();

  const onSubmit = () => {
    if (methodsRef.current) {
      methodsRef.current.handleSubmit((data) => {
        const query = new URLSearchParams();
        query.append("alignment", alignment);

        if (data.target && data.target.length > 0) {
          query.append("target", data.target.join(","));
        }

        if (data.style && data.style.length > 0) {
          query.append("style", data.style.join(","));
        }

        if (data.attendance && data.attendance.length > 0) {
          query.append("attendance", data.attendance.join(","));
        }

        query.append("minFee", data.totalFee[0].toString());
        query.append("maxFee", data.totalFee[1].toString());

        router.push(`/search?${query.toString()}`);
        onSearch?.(data);
        onClose();
      })();
    }
  };

  const onClear = () => {
    if (methodsRef.current) {
      methodsRef.current.reset(DEFAULT_SEARCH_SCHOOL_VALUES);
    }
  };

  return (
    <BaseModal
      title="コース絞り込み"
      color="blue"
      type="search"
      footer={true}
      isOpen={opened}
      onClose={onClose}
      onSubmit={onSubmit}
      onClear={onClear}
    >
      <Stack
        sx={{
          maxHeight: 400,
          overflowY: "auto",
          alignItems: "center",
        }}
      >
        <SearchSchoolForm
          onClose={onClose}
          methodsRef={methodsRef}
          alignment={alignment}
          setAlignment={setAlignment}
          defaultValues={DEFAULT_SEARCH_SCHOOL_VALUES}
        />
      </Stack>
    </BaseModal>
  );
};
