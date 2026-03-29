import { Box } from "@mui/material";
import { SearchButton } from "../Buttons/SearchButton";
import { SortButton } from "../Buttons/SortButton";
import { SettingButton } from "../Buttons/SettingButton";
import { FILTER_SECTION_HEIGHT } from "@/lib/constants";

type Props = {
  isSort: boolean;
  toggleSort: () => void;
  showSetting?: boolean;
};

export const FilterSection = ({ isSort, toggleSort, showSetting }: Props) => {
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

      {showSetting !== false && <SettingButton />}
    </Box>
  );
};
