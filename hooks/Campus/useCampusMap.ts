import { useCallback, useEffect, useState } from "react";
import { Campus } from "@/entities/campus";

export const useCampusMap = (campuses: Campus[]) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const defaultCenter = currentPosition ?? { lat: 35.6895, lng: 139.6917 };

  // 現在地取得
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {}
    );
  }, []);

  // キャンパスに応じて表示範囲調整
  useEffect(() => {
    if (!map || campuses.length === 0) return;

    if (campuses.length === 1) {
      map.panTo({ lat: campuses[0].lat, lng: campuses[0].lng });
      map.setZoom(12);
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    campuses.forEach((c) =>
      bounds.extend(new google.maps.LatLng(c.lat, c.lng))
    );
    map.fitBounds(bounds);
  }, [map, campuses]);

  // 現在地優先表示
  useEffect(() => {
    if (!map || !currentPosition) return;
    map.panTo(currentPosition);
    map.setZoom(12);
  }, [map, currentPosition]);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return {
    onLoad,
    onUnmount,
    defaultCenter,
    zoom: campuses.length > 0 ? 12 : 6,
  };
};
