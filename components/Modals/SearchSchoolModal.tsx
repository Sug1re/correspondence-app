"use client";

import React, { useRef, useState } from "react";
import { z } from "zod";
import { SearchSchoolForm } from "../Forms/SearchSchoolForm";
import { BaseModal } from "../Base/BaseModal";
import { SearchSchema } from "@/lib/validation/SearchSchema";
import { DEFAULT_SEARCH_VALUES, SearchFormValues } from "@/entities/form";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

import { Stack } from "@mui/material";

type Props = {
  opened: boolean;
  onSearch?: (data: SearchFormValues) => void;
  onClose: () => void;
};

export const SearchSchoolModal = ({ opened, onSearch, onClose }: Props) => {
  const [alignment, setAlignment] = useState("AND");

  const methodsRef = useRef<UseFormReturn<z.infer<typeof SearchSchema>> | null>(
    null,
  );

  const router = useRouter();

  const onSubmit = () => {
    if (methodsRef.current) {
      methodsRef.current.handleSubmit((data) => {
        const query = new URLSearchParams();
        query.append("alignment", alignment);

        if (data.admissionType && data.admissionType.length > 0) {
          query.append("admissionType", data.admissionType.join(","));
        }

        if (data.style && data.style.length > 0) {
          query.append("style", data.style.join(","));
        }

        if (data.frequency && data.frequency.length > 0) {
          query.append("frequency", data.frequency.join(","));
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
      methodsRef.current.reset(DEFAULT_SEARCH_VALUES);
    }
  };

  return (
    <BaseModal
      title="コース絞り込み"
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
          defaultValues={DEFAULT_SEARCH_VALUES}
        />
      </Stack>
    </BaseModal>
  );
};
