"use client";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { Campus } from "@/entities/campus";
import { useEffect, useState, useCallback } from "react";

type Props = {
  campuses: Campus[];
};

export const CampusMap = ({ campuses }: Props) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const defaultCenter = { lat: 35.6895, lng: 139.6917 }; // Tokyo

  useEffect(() => {
    if (!map || campuses.length === 0) return;

    if (campuses.length === 1) {
      map.panTo({ lat: campuses[0].lat, lng: campuses[0].lng });
      map.setZoom(12);
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    campuses.forEach((c) =>
      bounds.extend(new window.google.maps.LatLng(c.lat, c.lng))
    );
    map.fitBounds(bounds);
  }, [map, campuses]);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "200px" }}
      center={campuses[0] ?? defaultCenter}
      zoom={campuses.length > 0 ? 12 : 6}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      }}
    >
      {campuses.map((campus) => (
        <Marker
          key={campus.value}
          position={{ lat: campus.lat, lng: campus.lng }}
        />
      ))}
    </GoogleMap>
  );
};
