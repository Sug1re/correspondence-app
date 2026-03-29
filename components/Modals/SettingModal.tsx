import { Stack } from "@mui/material";
import { BaseModal } from "../Base/BaseModal";
import { SettingForm } from "../Forms/SettingForm";
import { DEFAULT_SETTING_VALUES, SettingFormValues } from "@/entities/form";
import { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { SettingSchema } from "@/lib/validation/Schema";
import { useSetting } from "@/context/SettingContext";

type Props = {
  opened: boolean;
  onApplicable?: (data: SettingFormValues) => void;
  onClose: () => void;
};

export const SettingModal = ({ opened, onApplicable, onClose }: Props) => {
  const { settings } = useSetting();
  const methodsRef = useRef<UseFormReturn<
    z.infer<typeof SettingSchema>
  > | null>(null);

  const onSubmit = () => {
    if (methodsRef.current) {
      methodsRef.current.handleSubmit((data) => {
        onApplicable?.(data);
        onClose();
      })();
    }
  };

  const onClear = () => {
    if (methodsRef.current) {
      methodsRef.current.reset(DEFAULT_SETTING_VALUES);
    }
  };

  return (
    <BaseModal
      title="設定"
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
        <SettingForm
          onClose={onClose}
          methodsRef={methodsRef}
          defaultValues={settings}
        />
      </Stack>
    </BaseModal>
  );
};
