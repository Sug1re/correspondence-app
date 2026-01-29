"use client";

import { BaseModal } from "../Base/BaseModal";
import { Stack, SelectChangeEvent } from "@mui/material";
import { CampusForm } from "../Forms/CampusForm";
import { CampusState } from "@/entities/campus";
import { useCampusModal } from "@/hooks/Campus/useCampusModal";

type Props = {
  opened: boolean;
  onClose: () => void;
  location: string;
  handleChange: (event: SelectChangeEvent) => void;
  selectedCampus: CampusState;
  setSelectedCampus: React.Dispatch<React.SetStateAction<CampusState>>;
  onClear: () => void;
};

export const CampusModal = ({
  opened,
  onClose,
  location,
  handleChange,
  selectedCampus,
  setSelectedCampus,
  onClear,
}: Props) => {
  const {
    localSelectedCampus,
    setLocalSelectedCampus,
    onSubmit,
    onClear: onClearLocal,
  } = useCampusModal({
    opened,
    selectedCampus,
    setSelectedCampus,
    onClose,
    onClearGlobal: onClear,
  });

  return (
    <BaseModal
      title="地域を選択"
      type="search"
      footer={true}
      isOpen={opened}
      onClose={onClose}
      onSubmit={onSubmit}
      onClear={onClearLocal}
    >
      <Stack
        sx={{
          maxHeight: 400,
          overflowY: "auto",
          alignItems: "center",
        }}
      >
        <CampusForm
          location={location}
          handleChange={handleChange}
          setSelectedCampus={setLocalSelectedCampus}
          selectedCampus={localSelectedCampus}
        />
      </Stack>
    </BaseModal>
  );
};
