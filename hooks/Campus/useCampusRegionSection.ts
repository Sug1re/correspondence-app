import { useMemo } from "react";
import { CampusState } from "@/entities/campus";
import { useRegions } from "@/hooks/Campus/useRegions";

interface Props {
  location: string;
  selectedCampus: CampusState;
  setSelectedCampus: React.Dispatch<React.SetStateAction<CampusState>>;
}

export const useCampusRegionSection = ({
  location,
  selectedCampus,
  setSelectedCampus,
}: Props) => {
  const { regions, loadingRegions, error } = useRegions();

  // locationで表示制御
  const showTohokuGroup =
    location === "All" || location === "Hokkaido Tohoku";

  const showKantoGroup =
    location === "All" || location === "Tokyo Kita_kanto Minami_kanto";

  const showTokaiGroup =
    location === "All" || location === "Tokai Hokuriku Koshinetsu";

  const showKinkiGroup =
    location === "All" || location === "Kinki Osaka";

  const showSetonaikaiGroup =
    location === "All" || location === "Chugoku Shikoku";

  const showKyushuGroup =
    location === "All" || location === "Kyushu Okinawa";

  // regionを取得
  const getRegionById = useMemo(
    () => (id: string) => regions.find((r) => r.id === id),
    [regions]
  );

  // onChange共通化
  const handleChange =
    (regionId: keyof CampusState) =>
    (_: React.MouseEvent<HTMLElement>, value: string[]) => {
      setSelectedCampus((prev) => ({
        ...prev,
        [regionId]: value,
      }));
    };

  return {
    regions,
    loadingRegions,
    error,
    showTohokuGroup,
    showKantoGroup,
    showTokaiGroup,
    showKinkiGroup,
    showSetonaikaiGroup,
    showKyushuGroup,
    getRegionById,
    handleChange,
    selectedCampus,
  };
};
