"use client";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { Campus } from "@/entities/campus";
import { useCampusMap } from "@/hooks/Campus/useCampusMap";

type Props = {
  campuses: Campus[];
};

export const CampusMap = ({ campuses }: Props) => {
  const { onLoad, onUnmount, defaultCenter, zoom } = useCampusMap(campuses);

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
      {campuses.map((campus) => (
        <Marker
          key={campus.value}
          position={{ lat: campus.lat, lng: campus.lng }}
        />
      ))}
    </GoogleMap>
  );
};
