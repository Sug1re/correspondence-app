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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      setLoading(true);
      try {
        const positions = await Promise.all(
          campuses.map((campus) => geocodeAddress(campus.address))
        );
        // geocodeAddress が null を返す可能性をフィルタリング
        setMarkerPositions(positions.filter((p): p is LatLng => p !== null));
      } catch (error) {
        console.error("Geocoding error:", error);
        // エラーが発生した場合、既存のlat/lngを使用するフォールバック
        setMarkerPositions(campuses.map(c => ({ lat: c.lat, lng: c.lng })));
      } finally {
        setLoading(false);
      }
    };

    if (campuses.length > 0) {
      fetchPositions();
    } else {
      setMarkerPositions([]);
    }
  }, [campuses]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "300px" }}
      center={campuses[0] ?? defaultCenter}
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
          <Marker
            key={index}
            position={position}
          />
        ))}
    </GoogleMap>
  );
};
