import { useEffect, useState } from "react";
import { Campus } from "@/entities/campus";
import { geocodeAddress, LatLng } from "@/lib/googleMap";

export const useCampusGeocode = (campuses: Campus[]) => {
  const [markerPositions, setMarkerPositions] = useState<LatLng[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      setLoading(true);
      try {
        const positions = await Promise.all(
          campuses.map((campus) => geocodeAddress(campus.address))
        );
        const validPositions = positions.filter(
          (p): p is LatLng => p !== null
        );
        setMarkerPositions(validPositions);
      } catch (error) {
        console.error("Geocoding error:", error);
        setMarkerPositions([]);
      } finally {
        setLoading(false);
      }
    };

    if (campuses.length > 0) {
      fetchPositions();
    } else {
      setMarkerPositions([]);
      setLoading(false);
    }
  }, [campuses]);

  return { markerPositions, loading };
};
