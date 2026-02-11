"use client";

import { useDisclosure } from "@mantine/hooks";
import { Button, Typography } from "@mui/material";
import { CampusModal } from "../Modals/CampusModal";
import { useCampus } from "@/hooks/Campus/useCampus";
import { Loading } from "../Loading";
import { Region, Campus } from "@/entities/campus";
import { useJsApiLoader } from "@react-google-maps/api";
import { CampusMap } from "@/components/CampusMap";
import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const MapSection = () => {
  const [isOpen, handlers] = useDisclosure(false);
  const { location, handleChange, selectedCampus, setSelectedCampus, onClear } =
    useCampus();
  const [regions, setRegions] = useState<Region[]>([]);
  const [loadingRegions, setLoadingRegions] = useState(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    const fetchRegions = async () => {
      setLoadingRegions(true);
      console.log("🔥 fetchRegions start");

      try {
        // ① regions コレクション取得
        const regionSnap = await getDocs(collection(db, "regions"));
        console.log(
          "📦 regions snapshot:",
          regionSnap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );

        const regionData: Region[] = await Promise.all(
          regionSnap.docs.map(async (regionDoc) => {
            console.log("➡️ regionDoc.id:", regionDoc.id);

            // ② locations サブコレクション取得
            const locationsSnap = await getDocs(
              collection(db, "regions", regionDoc.id, "locations")
            );

            console.log(
              `📍 locations for region ${regionDoc.id}:`,
              locationsSnap.docs.map((locDoc) => ({
                id: locDoc.id,
                data: locDoc.data(),
              }))
            );

            const locations: Campus[] = locationsSnap.docs.map((locDoc) => ({
              id: locDoc.id,
              ...locDoc.data(),
            })) as Campus[];

            return {
              id: regionDoc.id,
              locations,
            };
          })
        );

        console.log("✅ final regionData:", regionData);
        setRegions(regionData);
      } catch (err) {
        console.error("❌ Failed to fetch regions:", err);
      } finally {
        setLoadingRegions(false);
      }
    };

    fetchRegions();
  }, []);

  const selectedCampusMarkers: Campus[] = Object.entries(
    selectedCampus
  ).flatMap(([regionId, locationIds]) => {
    const region = regions.find((r) => r.id === regionId);
    if (!region) return [];

    return locationIds
      .map((locId) => region.locations.find((loc) => loc.id === locId))
      .filter((loc): loc is Campus => Boolean(loc));
  });

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
