"use client";

import { useDisclosure } from "@mantine/hooks";
import { Button, Typography } from "@mui/material";
import { CampusModal } from "../Modals/CampusModal";
import { useCampus } from "@/hooks/Campus/useCampus";
import { Loading } from "../Loading";
import { CAMPUSES, Campus } from "@/entities/campus";
import { useJsApiLoader } from "@react-google-maps/api";
import { CampusMap } from "@/components/CampusMap";

export const MapSection = () => {
  const [isOpen, handlers] = useDisclosure(false);
  const { location, handleChange, selectedCampus, setSelectedCampus, onClear } =
    useCampus();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  /** 選択中キャンパス → 座標付きデータへ変換 */
  const selectedCampusMarkers: Campus[] = Object.values(selectedCampus)
    .flat()
    .map((name) => CAMPUSES.find((c) => c.value === name))
    .filter(Boolean) as Campus[];

  if (!isLoaded) return <Loading />;

  return (
    <>
      <CampusMap campuses={selectedCampusMarkers} />

      <Button
        onClick={handlers.open}
        sx={{
          py: 1.5,
          borderRadius: 2,
          backgroundColor: "#060666ff",
          color: "#FFF",
          boxShadow: 2,
          "&:hover": { transform: "scale(0.95)" },
        }}
        disableRipple
      >
        <Typography fontWeight={600}>地域を選択</Typography>
      </Button>

      <CampusModal
        opened={isOpen}
        onClose={handlers.close}
        location={location}
        handleChange={handleChange}
        selectedCampus={selectedCampus}
        setSelectedCampus={setSelectedCampus}
        onClear={onClear}
      />
    </>
  );
};
