"use client";

import {
  Box,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
  Typography,
} from "@mui/material";
import { CampusButton } from "@/components/Buttons/CampusButton";
import { CampusState } from "@/entities/campus";
import { Partition } from "@/components/Partition";

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
  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    gap: 8,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",

    [`& .${toggleButtonGroupClasses.firstButton},
    & .${toggleButtonGroupClasses.middleButton}`]: {
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },

    [`& .${toggleButtonGroupClasses.lastButton},
    & .${toggleButtonGroupClasses.middleButton}`]: {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderLeft: `1px solid #060666ff !important`,
    },

    [`& .${toggleButtonGroupClasses.lastButton}.Mui-disabled,
    & .${toggleButtonGroupClasses.middleButton}.Mui-disabled`]: {
      borderLeft: `1px solid ${theme.palette.action.disabledBackground} !important`,
    },
  }));

  const RangeStyle = {
    display: " flex",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 20,
    py: 1,
  };

  const LocationStyle = {
    bgcolor: "rgba(0, 51, 153, 0.1)",
    display: " flex",
    justifyContent: "center",
    fontWeight: "bold",
    py: 1,
  };

  return (
    <form>
      <Box sx={{ minWidth: 300, maxWidth: 500 }}>
        <CardContent>
          <FormControl
            fullWidth
            sx={{
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
            <InputLabel id="demo-simple-select-label">地域</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={location}
              label="Location"
              onChange={handleChange}
            >
              <MenuItem value={"全て"}>全て</MenuItem>
              <MenuItem value={"北海道・東北"}>北海道・東北</MenuItem>
              <MenuItem value={"関東"}>関東</MenuItem>
              <MenuItem value={"東海・北陸・甲信越"}>
                東海・北陸・甲信越
              </MenuItem>
              <MenuItem value={"近畿"}>近畿</MenuItem>
              <MenuItem value={"中国・四国"}>中国・四国</MenuItem>
              <MenuItem value={"九州・沖縄"}>九州・沖縄</MenuItem>
            </Select>
          </FormControl>
        </CardContent>

        {(location === "全て" || location === "北海道・東北") && (
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography sx={RangeStyle}>北海道・東北</Typography>

            <Partition width="100%" />

            <Typography sx={LocationStyle}>北海道</Typography>

            <StyledToggleButtonGroup
              value={selectedCampus.hokkaido}
              onChange={(_, value) =>
                setSelectedCampus((prev) => ({
                  ...prev,
                  hokkaido: value,
                }))
              }
            >
              <CampusButton label="札幌大通り（北海道）" value="Sapporo Odori" />
              <CampusButton label="北海道函館（北海道）" value="Hakodate" />
            </StyledToggleButtonGroup>

            <Typography sx={LocationStyle}>東北</Typography>

            <StyledToggleButtonGroup
              value={selectedCampus.tohoku}
              onChange={(_, value) =>
                setSelectedCampus((prev) => ({
                  ...prev,
                  tohoku: value,
                }))
              }
            >
              <CampusButton label="仙台広瀬通（宮城県）" value="Sendai Hirose-dori" />
              <CampusButton label="仙台新寺通（宮城県）" value="Sendai Shin-Terakoji" />
              <CampusButton label="福島（福島県）" value="Fukushima" />
              <CampusButton label="福島郡山（福島県）" value="Fukushima Koriyama" />
              <CampusButton label="いわき（福島県）" value="Iwaki" />
              <CampusButton label="青森（青森県）" value="Aomori" />
              <CampusButton label="岩手盛岡（岩手県）" value="Iwate Morioka" />
              <CampusButton label="山形（山形県）" value="Yamagata" />
              <CampusButton label="秋田（秋田県）" value="Akita" />
            </StyledToggleButtonGroup>
          </CardContent>
        )}
        {(location === "全て" || location === "東海・北陸・甲信越") && (
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography sx={RangeStyle}>東海・北陸・甲信越</Typography>

            <Partition width="100%" />

            <Typography sx={LocationStyle}>東海</Typography>

            <StyledToggleButtonGroup
              value={selectedCampus.tokai}
              onChange={(_, value) =>
                setSelectedCampus((prev) => ({
                  ...prev,
                  tokai: value,
                }))
              }
            >
              <CampusButton label="名古屋栄（愛知県）" value="Nagoya Sakae" />
              <CampusButton label="名駅（愛知県）" value="Meieki" />
              <CampusButton label="東岡崎（愛知県）" value="Higashi Okazaki" />
              <CampusButton label="豊田（愛知県）" value="Toyota" />
              <CampusButton label="静岡（静岡県）" value="Shizuoka" />
              <CampusButton label="静岡沼津（静岡県）" value="Shizuoka Numazu" />
              <CampusButton label="浜松（静岡県）" value="Hamamatsu" />
              <CampusButton label="岐阜（岐阜県）" value="Gifu" />
              <CampusButton label="三重（三重県）" value="Mie" />
            </StyledToggleButtonGroup>

            <Typography sx={LocationStyle}>北陸</Typography>

            <StyledToggleButtonGroup
              value={selectedCampus.hokuriku}
              onChange={(_, value) =>
                setSelectedCampus((prev) => ({
                  ...prev,
                  hokuriku: value,
                }))
              }
            >
              <CampusButton label="金沢（石川県）" value="Kanazawa" />
              <CampusButton label="富山（富山県）" value="Toyama" />
              <CampusButton label="福井（福井県）" value="Fukui" />
            </StyledToggleButtonGroup>

            <Typography sx={LocationStyle}>甲信越</Typography>

            <StyledToggleButtonGroup
              value={selectedCampus.koshinetsu}
              onChange={(_, value) =>
                setSelectedCampus((prev) => ({
                  ...prev,
                  koshinetsu: value,
                }))
              }
            >
              <CampusButton label="新潟（新潟県）" value="Niigata" />
              <CampusButton label="新潟長岡（新潟県）" value="Niigata Nagaoka" />
              <CampusButton label="長野（長野県）" value="Nagano" />
              <CampusButton label="長野松本（長野県）" value="Nagano Matsumoto" />
              <CampusButton label="山梨（山梨県）" value="Yamanashi" />
            </StyledToggleButtonGroup>
          </CardContent>
        )}
      </Box>
    </form>
  );
};
