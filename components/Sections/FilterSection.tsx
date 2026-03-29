import { Box } from "@mui/material";
import { SearchButton } from "../Buttons/SearchButton";
import { SortButton } from "../Buttons/SortButton";
import { SettingButton } from "../Buttons/SettingButton";
import { FILTER_SECTION_HEIGHT } from "@/lib/constants";

type Props = {
  isSort: boolean;
  isSetting: boolean;
  toggleSort: () => void;
  toggleSetting: () => void;
};

export const FilterSection = ({
  isSort,
  isSetting,
  toggleSort,
  toggleSetting,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: FILTER_SECTION_HEIGHT,
        gap: 4,
      }}
    >
      <SearchButton />

      <SortButton selected={isSort} onToggle={toggleSort} />

      <SettingButton selected={isSetting} onToggle={toggleSetting} />
    </Box>
  );
};
