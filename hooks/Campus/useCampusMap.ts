import { useCallback, useEffect, useState } from "react";
import { LatLng } from "@/lib/googleMap";

const defaultCenter = { lat: 35.6895, lng: 139.6917 };

export const useCampusMap = (markerPositions: LatLng[]) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!map) return;

    if (markerPositions.length === 1) {
      map.panTo(markerPositions[0]);
      map.setZoom(12);
    } else if (markerPositions.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      markerPositions.forEach((p) => bounds.extend(p));
      map.fitBounds(bounds);
    } else {
      map.panTo(defaultCenter);
      map.setZoom(6);
    }
  }, [map, markerPositions]);

  return { onLoad, onUnmount, defaultCenter };
};
