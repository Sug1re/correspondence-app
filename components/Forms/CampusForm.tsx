"use client";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
  Typography,
} from "@mui/material";
import { Partition } from "../Partition";

interface Props {
  location: string;
  handleChange: (event: SelectChangeEvent) => void;
  setSelectedCampus: React.Dispatch<React.SetStateAction<CampusState>>;
  selectedCampus: CampusState;
}

import { CampusState } from "@/entities/campus";

export const CampusForm = ({
  location,
  handleChange,
  setSelectedCampus,
  selectedCampus,
}: Props) => {
  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    gap: 6,
    flexWrap: "wrap",

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

  const ToggleButtonStyle = {
    width: 160,
    fontSize: 11,
    height: 30,
    color: "#060666ff",
    border: "1px solid #060666ff",
    "&.Mui-selected": {
      bgcolor: "#060666ff",
      color: "#fff",
    },
    "&.Mui-selected:hover": {
      bgcolor: "#060666ff",
      color: "#fff",
    },
    "&:hover": {
      bgcolor: "transparent",
    },
  };

  const ItemStyle = {
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
      <Box sx={{ mt: 2 }}>
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
            <MenuItem value={"東海・北陸・甲信越"}>東海・北陸・甲信越</MenuItem>
            <MenuItem value={"近畿"}>近畿</MenuItem>
            <MenuItem value={"中国・四国"}>中国・四国</MenuItem>
            <MenuItem value={"九州・沖縄"}>九州・沖縄</MenuItem>
          </Select>
        </FormControl>

        {(location === "全て" || location === "北海道・東北") && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: 0.5,
              mt: 2,
              gap: 1,
            }}
          >
            <Typography sx={ItemStyle}>北海道・東北</Typography>

            <Partition />
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
              <ToggleButton
                value="札幌大通り"
                sx={ToggleButtonStyle}
                disableRipple
              >
                札幌大通り（北海道）
              </ToggleButton>

              <ToggleButton value="函館" sx={ToggleButtonStyle} disableRipple>
                北海道函館（北海道）
              </ToggleButton>
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
              <ToggleButton
                value="札幌大通り"
                sx={ToggleButtonStyle}
                disableRipple
              >
                札幌大通り（北海道）
              </ToggleButton>

              <ToggleButton value="函館" sx={ToggleButtonStyle} disableRipple>
                北海道函館（北海道）
              </ToggleButton>
              <ToggleButton value="函館" sx={ToggleButtonStyle} disableRipple>
                北海道函館（北海道）
              </ToggleButton>
              <ToggleButton value="函館" sx={ToggleButtonStyle} disableRipple>
                北海道函館（北海道）
              </ToggleButton>
              <ToggleButton value="函館" sx={ToggleButtonStyle} disableRipple>
                北海道函館（北海道）
              </ToggleButton>
              <ToggleButton value="函館" sx={ToggleButtonStyle} disableRipple>
                北海道函館（北海道）
              </ToggleButton>
              <ToggleButton value="函館" sx={ToggleButtonStyle} disableRipple>
                北海道函館（北海道）
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Box>
        )}

        {/* <StyledToggleButtonGroup
        value={selectedCampus}
        onChange={(_, value) => setSelectedCampus(value)}
      >
        <ToggleButton value="新潟" sx={ToggleButtonStyle} disableRipple>
          新潟 （新潟県）
        </ToggleButton>

        <ToggleButton value="新潟長岡" sx={ToggleButtonStyle} disableRipple>
          新潟長岡 （新潟県）
        </ToggleButton>
      </StyledToggleButtonGroup>
      <StyledToggleButtonGroup
        value={selectedCampus}
        onChange={(_, value) => setSelectedCampus(value)}
      >
        <ToggleButton value="新潟" sx={ToggleButtonStyle} disableRipple>
          新潟 （新潟県）
        </ToggleButton>

        <ToggleButton value="新潟長岡" sx={ToggleButtonStyle} disableRipple>
          新潟長岡 （新潟県）
        </ToggleButton>
      </StyledToggleButtonGroup>
      <StyledToggleButtonGroup
        value={selectedCampus}
        onChange={(_, value) => setSelectedCampus(value)}
      >
        <ToggleButton value="新潟" sx={ToggleButtonStyle} disableRipple>
          新潟 （新潟県）
        </ToggleButton>

        <ToggleButton value="新潟長岡" sx={ToggleButtonStyle} disableRipple>
          新潟長岡 （新潟県）
        </ToggleButton>
      </StyledToggleButtonGroup>
      <StyledToggleButtonGroup
        value={selectedCampus}
        onChange={(_, value) => setSelectedCampus(value)}
      >
        <ToggleButton value="新潟" sx={ToggleButtonStyle} disableRipple>
          新潟 （新潟県）
        </ToggleButton>

        <ToggleButton value="新潟長岡" sx={ToggleButtonStyle} disableRipple>
          新潟長岡 （新潟県）
        </ToggleButton>
      </StyledToggleButtonGroup>
      <StyledToggleButtonGroup
        value={selectedCampus}
        onChange={(_, value) => setSelectedCampus(value)}
      >
        <ToggleButton value="新潟" sx={ToggleButtonStyle} disableRipple>
          新潟 （新潟県）
        </ToggleButton>

        <ToggleButton value="新潟長岡" sx={ToggleButtonStyle} disableRipple>
          新潟長岡 （新潟県）
        </ToggleButton>
      </StyledToggleButtonGroup>
      <StyledToggleButtonGroup
        value={selectedCampus}
        onChange={(_, value) => setSelectedCampus(value)}
      >
        <ToggleButton value="新潟" sx={ToggleButtonStyle} disableRipple>
          新潟 （新潟県）
        </ToggleButton>

        <ToggleButton value="新潟長岡" sx={ToggleButtonStyle} disableRipple>
          新潟長岡 （新潟県）
        </ToggleButton>
      </StyledToggleButtonGroup>
      <StyledToggleButtonGroup
        value={selectedCampus}
        onChange={(_, value) => setSelectedCampus(value)}
      >
        <ToggleButton value="新潟" sx={ToggleButtonStyle} disableRipple>
          新潟 （新潟県）
        </ToggleButton>

        <ToggleButton value="新潟長岡" sx={ToggleButtonStyle} disableRipple>
          新潟長岡 （新潟県）
        </ToggleButton>
      </StyledToggleButtonGroup>
      <StyledToggleButtonGroup
        value={selectedCampus}
        onChange={(_, value) => setSelectedCampus(value)}
      >
        <ToggleButton value="新潟" sx={ToggleButtonStyle} disableRipple>
          新潟 （新潟県）
        </ToggleButton>

        <ToggleButton value="新潟長岡" sx={ToggleButtonStyle} disableRipple>
          新潟長岡 （新潟県）
        </ToggleButton>
      </StyledToggleButtonGroup>
      <StyledToggleButtonGroup
        value={selectedCampus}
        onChange={(_, value) => setSelectedCampus(value)}
      >
        <ToggleButton value="新潟" sx={ToggleButtonStyle} disableRipple>
          新潟 （新潟県）
        </ToggleButton>

        <ToggleButton value="新潟長岡" sx={ToggleButtonStyle} disableRipple>
          新潟長岡 （新潟県）
        </ToggleButton>
      </StyledToggleButtonGroup>
      <StyledToggleButtonGroup
        value={selectedCampus}
        onChange={(_, value) => setSelectedCampus(value)}
      >
        <ToggleButton value="新潟" sx={ToggleButtonStyle} disableRipple>
          新潟 （新潟県）
        </ToggleButton>

        <ToggleButton value="新潟長岡" sx={ToggleButtonStyle} disableRipple>
          新潟長岡 （新潟県）
        </ToggleButton>
      </StyledToggleButtonGroup> */}
      </Box>
    </form>
  );
};
