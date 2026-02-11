"use client";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { Campus } from "@/entities/campus";
import { useCampusMap } from "@/hooks/Campus/useCampusMap";
import { useEffect, useState } from "react";
import { geocodeAddress, LatLng } from "@/lib/googleMap";

type Props = {
  campuses: Campus[];
};

export const CampusMap = ({ campuses }: Props) => {
  const { onLoad, onUnmount, defaultCenter, zoom } = useCampusMap(campuses);
  const [markerPositions, setMarkerPositions] = useState<LatLng[]>([]);
  const [mapCenter, setMapCenter] = useState<LatLng>(defaultCenter);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      setLoading(true);
      try {
        const positions = await Promise.all(
          campuses.map((campus) => geocodeAddress(campus.address))
        );

        const valid = positions.filter((p): p is LatLng => p !== null);

        if (valid.length === 0) {
          throw new Error("No valid geocode results");
        }

        setMarkerPositions(valid);
        setMapCenter(valid[0]); // 正常時は最初のキャンパスへ
      } catch (error) {
        console.error("Geocoding error:", error);

        // ❗ エラー時は defaultCenter に統一
        setMarkerPositions([defaultCenter]);
        setMapCenter(defaultCenter);
      } finally {
        setLoading(false);
      }
    };

    if (campuses.length > 0) {
      fetchPositions();
    } else {
      setMarkerPositions([]);
      setMapCenter(defaultCenter);
    }
  }, [campuses, defaultCenter]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "300px" }}
      center={mapCenter}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      }}
    >
      {!loading &&
        markerPositions.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
    </GoogleMap>
  );
};
