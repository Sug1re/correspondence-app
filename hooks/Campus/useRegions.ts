import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Region, Campus } from "@/entities/campus";

export const useRegions = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loadingRegions, setLoadingRegions] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      setLoadingRegions(true);
      setError(null);

      try {
        const regionSnap = await getDocs(collection(db, "regions"));

        const regionData: Region[] = await Promise.all(
          regionSnap.docs.map(async (regionDoc) => {
            const locationsSnap = await getDocs(
              collection(db, "regions", regionDoc.id, "locations")
            );

            const locations: Campus[] = locationsSnap.docs.map((locDoc) => ({
              id: locDoc.id,
              ...locDoc.data(),
            })) as Campus[];

            return {
              id: regionDoc.id,
              locations,
            };
          })
        );

        setRegions(regionData);
      } catch (err) {
        console.error("Failed to fetch regions:", err);
        setError(err);
      } finally {
        setLoadingRegions(false);
      }
    };

    fetchRegions();
  }, []);

  return { regions, loadingRegions, error };
};
