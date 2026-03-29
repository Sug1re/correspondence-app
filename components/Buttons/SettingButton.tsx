"use client";

import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDisclosure } from "@mantine/hooks";
import { SettingModal } from "../Modals/SettingModal";
import { useSetting } from "@/context/SettingContext";

export const SettingButton = () => {
  const [isOpen, handlers] = useDisclosure(false);
  const { setSettings } = useSetting();

  return (
    <>
      <IconButton
        edge="start"
        sx={{
          color: "#060666ff",
          border: `1px solid #060666ff`,
          width: 40,
          height: 40,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            transform: "scale(0.95)",
            bgcolor: "#ffffff",
          },
        }}
        onClick={handlers.open}
        disableRipple
      >
        <SettingsIcon style={{ fontSize: 28 }} />
      </IconButton>

      <SettingModal
        opened={isOpen}
        onClose={handlers.close}
        onApplicable={(data) => {
          setSettings(data);
        }}
      />
    </>
  );
};
