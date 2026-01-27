import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { CampusState } from "@/entities/campus";

const INITIAL_CAMPUS_STATE: CampusState = {
  hokkaido: [],
  tohoku: [],
  kanto: [],
  tokai: [],
  hokuriku: [],
  koshinetsu: [],
  kinki: [],
  chugoku: [],
  shikoku: [],
  kyushu: [],
  okinawa: [],
};

export const useCampus = () => {
  const [location, setLocation] = useState("全て");
  const [selectedCampus, setSelectedCampus] =
    useState<CampusState>(INITIAL_CAMPUS_STATE);

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const clearLocation = () => {
    setLocation("全て");
  };

  const clearCampus = () => {
    setSelectedCampus(INITIAL_CAMPUS_STATE);
  };

  const onClear = () => {
    clearLocation();
    clearCampus();
  };

  return {
    location,
    handleChange,
    selectedCampus,
    setSelectedCampus,
    clearLocation,
    clearCampus,
    onClear,
  };
};
