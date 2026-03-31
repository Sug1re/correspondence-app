"use client";

import {
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { CampusState } from "@/entities/campus";
import { CampusRegionSection } from "../Sections/CampusRegionSection";

interface Props {
  location: string;
  handleChange: (event: SelectChangeEvent) => void;
  setSelectedCampus: React.Dispatch<React.SetStateAction<CampusState>>;
  selectedCampus: CampusState;
}

export const CampusForm = ({
  location,
  handleChange,
  setSelectedCampus,
  selectedCampus,
}: Props) => {
  return (
    <form>
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <FormControl
          fullWidth
          sx={{
            width: 300,
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#060666ff",
            },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                border: `1px solid #060666ff`,
              },
              "&.Mui-focused fieldset": {
                border: `1px solid #060666ff`,
              },
            },
            "& .MuiSelect-icon": {
              color: "#060666ff",
            },
          }}
        >
          <InputLabel id="regions">地域</InputLabel>
          <Select
            labelId="regions"
            id="regions-select"
            value={location}
            label="Location"
            onChange={handleChange}
          >
            <MenuItem value={"All"}>全て</MenuItem>
            <MenuItem value={"Hokkaido Tohoku"}>北海道・東北</MenuItem>
            <MenuItem value={"Tokyo Kita_kanto Minami_kanto"}>関東</MenuItem>
            <MenuItem value={"Tokai Hokuriku Koshinetsu"}>
              東海・北陸・甲信越
            </MenuItem>
            <MenuItem value={"Kinki Osaka"}>近畿</MenuItem>
            <MenuItem value={"Chugoku Shikoku"}>中国・四国</MenuItem>
            <MenuItem value={"Kyushu Okinawa"}>九州・沖縄</MenuItem>
          </Select>
        </FormControl>
      </CardContent>

      <CampusRegionSection
        location={location}
        selectedCampus={selectedCampus}
        setSelectedCampus={setSelectedCampus}
      />
    </form>
  );
};
