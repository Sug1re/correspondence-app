import { useCallback, useEffect, useState } from "react";
import { LatLng } from "@/lib/googleMap";

export const useCampusMap = (markerPositions: LatLng[]) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentCenter, setCurrentCenter] = useState<LatLng>({
    lat: 35.6895,
    lng: 139.6917,
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        console.log("位置情報が取得できませんでした");
      }
    );
  }, []);

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
      map.panTo(currentCenter);
      map.setZoom(10);
    }
  }, [map, markerPositions, currentCenter]);

  return { onLoad, onUnmount, currentCenter };
};
