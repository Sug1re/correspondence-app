"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { CampusModal } from "../Modals/CampusModal";

const CAMPUS_ADDRESS_MAP: Record<string, string> = {
  新潟: "新潟県新潟市中央区東大通2-1-20",
  新潟長岡: "新潟県長岡市表町1-11-1",
};

export const MapSection = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const [isOpen, handlers] = useDisclosure(false);
  const [campus, setCampus] = useState("新潟");
  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextCampus: string | null
  ) => {
    if (nextCampus !== null) {
      setCampus(nextCampus);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const address = CAMPUS_ADDRESS_MAP[campus];
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results) {
        const location = results[0].geometry.location;
        setPosition({
          lat: location.lat(),
          lng: location.lng(),
        });
      }
    });
  }, [isLoaded, campus]);
  if (!isLoaded) return null;

  const ToggleButtonStyle = {
    width: 100,
    height: 30,
    color: "#060666ff",
    border: "1px solid #060666ff",
    "&.Mui-selected": {
      bgcolor: "#060666ff",
      color: "#fff",
    },
    "&.Mui-selected:hover": {
      bgcolor: "#060666ff",
      color: "#fff",
    },
    "&:hover": {
      bgcolor: "transparent",
    },
  };

  return (
    position && (
      <>
        <ToggleButtonGroup
          value={campus}
          exclusive
          onChange={handleChange}
          sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        >
          <ToggleButton value="新潟" sx={ToggleButtonStyle} disableRipple>
            新潟
          </ToggleButton>

          <ToggleButton value="新潟長岡" sx={ToggleButtonStyle} disableRipple>
            新潟長岡
          </ToggleButton>
        </ToggleButtonGroup>

        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "200px" }}
          center={position}
          zoom={15}
          options={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
          }}
        >
          <Marker position={position} />
        </GoogleMap>

        <Button
          size="medium"
          onClick={handlers.open}
          sx={{
            borderRadius: 2,
            backgroundColor: "#060666ff",
            color: "#FFFFFF",
            boxShadow: 2,
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(0.95)",
              backgroundColor: "#060666ff",
            },
            "@media (min-width:600px)": {
              px: 8,
              py: 3,
            },
          }}
          disableRipple
        >
          <Typography
            sx={{
              m: 1,
              gap: 1,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              "@media (min-width:600px)": {
                fontSize: 24,
              },
            }}
          >
            地域を選択
          </Typography>
        </Button>

        <CampusModal opened={isOpen} onClose={handlers.close} />
      </>
    )
  );
};
