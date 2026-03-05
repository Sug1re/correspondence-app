"use client";

import { useDisclosure } from "@mantine/hooks";
import { Button, Typography } from "@mui/material";
import { CampusModal } from "../Modals/CampusModal";
import { useCampusData } from "@/hooks/Campus/useCampusData";
import { Loading } from "../Loading";
import { useJsApiLoader } from "@react-google-maps/api";
import { CampusMap } from "@/components/CampusMap";
import { useRegions } from "@/hooks/Campus/useRegions";

export const MapSection = () => {
  const [isOpen, handlers] = useDisclosure(false);
  const { location, handleChange, selectedCampus, setSelectedCampus, onClear } =
    useCampusData();

  const { regions, loadingRegions } = useRegions();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const allCampusValues = Object.values(selectedCampus).flat();
  const allCampuses = regions.flatMap((region) => region.locations);

  const campusMap = new Map(allCampuses.map((c) => [c.value, c]));

  const selectedCampusMarkers = allCampusValues
    .map((value) => campusMap.get(value))
    .filter((c): c is (typeof allCampuses)[number] => Boolean(c));

  if (!isLoaded || loadingRegions) return <Loading />;

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
          transition: "transform 0.3s ease",
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
