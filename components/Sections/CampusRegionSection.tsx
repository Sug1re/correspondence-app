import {
  CardContent,
  Typography,
  ToggleButtonGroup,
  styled,
} from "@mui/material";
import { toggleButtonGroupClasses } from "@mui/material/ToggleButtonGroup";
import { CampusButton } from "@/components/Buttons/CampusButton";
import { Partition } from "@/components/Partition";
import { CampusState } from "@/entities/campus";
import { Loading } from "../Loading";
import { useCampusRegionSection } from "@/hooks/Campus/useCampusRegionSection";

interface Props {
  location: string;
  selectedCampus: CampusState;
  setSelectedCampus: React.Dispatch<React.SetStateAction<CampusState>>;
}

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
}));

const RangeStyle = {
  display: "flex",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: 20,
  py: 1,
};

const LocationStyle = {
  bgcolor: "rgba(0, 51, 153, 0.1)",
  display: "flex",
  justifyContent: "center",
  fontWeight: "bold",
  py: 1,
};

export const CampusRegionSection = ({
  location,
  selectedCampus,
  setSelectedCampus,
}: Props) => {
  const {
    loadingRegions,
    showTohokuGroup,
    showKantoGroup,
    showTokaiGroup,
    showKinkiGroup,
    showSetonaikaiGroup,
    showKyushuGroup,
    getRegionById,
    handleChange,
  } = useCampusRegionSection({
    location,
    selectedCampus,
    setSelectedCampus,
  });

  if (loadingRegions) return <Loading />;

  const hokkaido = getRegionById("hokkaido");
  const tohoku = getRegionById("tohoku");
  const tokyo = getRegionById("tokyo");
  const kita_kanto = getRegionById("kita_kanto");
  const minami_kanto = getRegionById("minami_kanto");
  const tokai = getRegionById("tokai");
  const hokuriku = getRegionById("hokuriku");
  const koshinetsu = getRegionById("koshinetsu");
  const kinki = getRegionById("kinki");
  const osaka = getRegionById("osaka");
  const chugoku = getRegionById("chugoku");
  const shikoku = getRegionById("shikoku");
  const kyushu = getRegionById("kyushu");
  const okinawa = getRegionById("okinawa");

  return (
    <>
      {showTohokuGroup && (
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography sx={RangeStyle}>北海道・東北</Typography>
          <Partition width="100%" />

          <Typography sx={LocationStyle}>北海道</Typography>
          <StyledToggleButtonGroup
            value={selectedCampus.hokkaido}
            onChange={handleChange("hokkaido")}
          >
            {hokkaido?.locations.map((campus) => (
              <CampusButton
                key={campus.id}
                label={campus.label}
                value={campus.value}
              />
            ))}
          </StyledToggleButtonGroup>

          <Typography sx={LocationStyle}>東北</Typography>
          <StyledToggleButtonGroup
            value={selectedCampus.tohoku}
            onChange={handleChange("tohoku")}
          >
            {tohoku?.locations.map((campus) => (
              <CampusButton
                key={campus.id}
                label={campus.label}
                value={campus.value}
              />
            ))}
          </StyledToggleButtonGroup>
        </CardContent>
      )}

      {showKantoGroup && (
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography sx={RangeStyle}>関東</Typography>
          <Partition width="100%" />

          <Typography sx={LocationStyle}>東京</Typography>
          <StyledToggleButtonGroup
            value={selectedCampus.tokyo}
            onChange={handleChange("tokyo")}
          >
            {tokyo?.locations.map((campus) => (
              <CampusButton
                key={campus.id}
                label={campus.label}
                value={campus.value}
              />
            ))}
          </StyledToggleButtonGroup>

          <Typography sx={LocationStyle}>北関東</Typography>
          <StyledToggleButtonGroup
            value={selectedCampus.kita_kanto}
            onChange={handleChange("kita_kanto")}
          >
            {kita_kanto?.locations.map((campus) => (
              <CampusButton
                key={campus.id}
                label={campus.label}
                value={campus.value}
              />
            ))}
          </StyledToggleButtonGroup>

          <Typography sx={LocationStyle}>南関東</Typography>
          <StyledToggleButtonGroup
            value={selectedCampus.minami_kanto}
            onChange={handleChange("minami_kanto")}
          >
            {minami_kanto?.locations.map((campus) => (
              <CampusButton
                key={campus.id}
                label={campus.label}
                value={campus.value}
              />
            ))}
          </StyledToggleButtonGroup>
        </CardContent>
      )}

      {showTokaiGroup && (
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography sx={RangeStyle}>東海・北陸・甲信越</Typography>
          <Partition width="100%" />

          <Typography sx={LocationStyle}>東海</Typography>
          <StyledToggleButtonGroup
            value={selectedCampus.tokai}
            onChange={handleChange("tokai")}
          >
            {tokai?.locations.map((campus) => (
              <CampusButton
                key={campus.id}
                label={campus.label}
                value={campus.value}
              />
            ))}
          </StyledToggleButtonGroup>

          <Typography sx={LocationStyle}>北陸</Typography>
          <StyledToggleButtonGroup
            value={selectedCampus.hokuriku}
            onChange={handleChange("hokuriku")}
          >
            {hokuriku?.locations.map((campus) => (
              <CampusButton
                key={campus.id}
                label={campus.label}
                value={campus.value}
              />
            ))}
          </StyledToggleButtonGroup>

          <Typography sx={LocationStyle}>甲信越</Typography>
          <StyledToggleButtonGroup
            value={selectedCampus.koshinetsu}
            onChange={handleChange("koshinetsu")}
          >
            {koshinetsu?.locations.map((campus) => (
              <CampusButton
                key={campus.id}
                label={campus.label}
                value={campus.value}
              />
            ))}
          </StyledToggleButtonGroup>
        </CardContent>
      )}

      {showKinkiGroup && (
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography sx={RangeStyle}>近畿</Typography>
          <Partition width="100%" />

          <Typography sx={LocationStyle}>近畿</Typography>
          <StyledToggleButtonGroup
            value={selectedCampus.kinki}
            onChange={handleChange("kinki")}
          >
            {kinki?.locations.map((campus) => (
              <CampusButton
                key={campus.id}
                label={campus.label}
                value={campus.value}
              />
            ))}
          </StyledToggleButtonGroup>

          <Typography sx={LocationStyle}>大阪</Typography>
          <StyledToggleButtonGroup
            value={selectedCampus.osaka}
            onChange={handleChange("osaka")}
          >
            {osaka?.locations.map((campus) => (
              <CampusButton
                key={campus.id}
                label={campus.label}
                value={campus.value}
              />
            ))}
          </StyledToggleButtonGroup>
        </CardContent>
      )}

      {showSetonaikaiGroup && (
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography sx={RangeStyle}>中国・四国</Typography>
          <Partition width="100%" />

          <Typography sx={LocationStyle}>中国</Typography>
          <StyledToggleButtonGroup
            value={selectedCampus.chugoku}
            onChange={handleChange("chugoku")}
          >
            {chugoku?.locations.map((campus) => (
              <CampusButton
                key={campus.id}
                label={campus.label}
                value={campus.value}
              />
            ))}
          </StyledToggleButtonGroup>

          <Typography sx={LocationStyle}>四国</Typography>
          <StyledToggleButtonGroup
            value={selectedCampus.shikoku}
            onChange={handleChange("shikoku")}
          >
            {shikoku?.locations.map((campus) => (
              <CampusButton
                key={campus.id}
                label={campus.label}
                value={campus.value}
              />
            ))}
          </StyledToggleButtonGroup>
        </CardContent>
      )}

      {showKyushuGroup && (
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography sx={RangeStyle}>九州・ 沖縄</Typography>
          <Partition width="100%" />

          <Typography sx={LocationStyle}>九州</Typography>
          <StyledToggleButtonGroup
            value={selectedCampus.kyushu}
            onChange={handleChange("kyushu")}
          >
            {kyushu?.locations.map((campus) => (
              <CampusButton
                key={campus.id}
                label={campus.label}
                value={campus.value}
              />
            ))}
          </StyledToggleButtonGroup>

          <Typography sx={LocationStyle}>沖縄</Typography>
          <StyledToggleButtonGroup
            value={selectedCampus.okinawa}
            onChange={handleChange("okinawa")}
          >
            {okinawa?.locations.map((campus) => (
              <CampusButton
                key={campus.id}
                label={campus.label}
                value={campus.value}
              />
            ))}
          </StyledToggleButtonGroup>
        </CardContent>
      )}
    </>
  );
};
