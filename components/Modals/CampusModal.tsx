"use client";

import { BaseModal } from "../Base/BaseModal";
import { Stack } from "@mui/material";
import { CampusForm } from "../Forms/CampusForm";
import { useCampus } from "@/hooks/useCampus";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export const CampusModal = ({ opened, onClose }: Props) => {
  const { location, handleChange, selectedCampus, setSelectedCampus, onClear } =
    useCampus();

  const onSubmit = () => {
    console.log("Submitted selectedCampus:", selectedCampus);
    onClose();
  };

  return (
    <BaseModal
      title="地域を選択"
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
        <CampusForm
          location={location}
          handleChange={handleChange}
          setSelectedCampus={setSelectedCampus}
          selectedCampus={selectedCampus}
        />
      </Stack>
    </BaseModal>
  );
};
