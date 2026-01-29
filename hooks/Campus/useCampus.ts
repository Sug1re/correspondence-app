import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { CampusState, INITIAL_CAMPUS_STATE } from "@/entities/campus";

export const useCampus = () => {
  const [location, setLocation] = useState("All");
  const [selectedCampus, setSelectedCampus] =
    useState<CampusState>(INITIAL_CAMPUS_STATE);

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const clearLocation = () => {
    setLocation("All");
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
