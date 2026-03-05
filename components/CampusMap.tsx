"use client";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { Campus } from "@/entities/campus";
import { useCampusGeocode } from "@/hooks/Campus/useCampusGeocode";
import { useCampusMap } from "@/hooks/Campus/useCampusMap";

type Props = {
  campuses: Campus[];
};

export const CampusMap = ({ campuses }: Props) => {
  const { markerPositions, loading } = useCampusGeocode(campuses);
  const { onLoad, onUnmount, currentCenter } = useCampusMap(markerPositions);

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "300px" }}
      center={currentCenter}
      zoom={6}
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
