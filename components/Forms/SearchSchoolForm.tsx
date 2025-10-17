"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  SearchSchoolSchema,
  FormValues,
} from "@/lib/validation/SearchSchoolSchema";
import { handleFormSubmit } from "@/lib/handlers/handleFormSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Radio,
  RadioGroup,
  Slider,
  styled,
  Typography,
} from "@mui/material";
import { useFormSynchro } from "@/hooks/useFormSynchro";

import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ComputerIcon from "@mui/icons-material/Computer";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  onClose: () => void;
}

const attendanceOptions = [
  "週1",
  "週2",
  "週3",
  "週4",
  "週5",
  "オンライン",
  "自由",
];

export const SearchSchoolForm: React.FC<Props> = ({ onClose }) => {
  // Radioのカラーリング
  const CustomRadio = styled(Radio)({
    color: "#003399",
    "&.Mui-checked": {
      color: "#003399",
    },
  });

  // CheckBoxのカラーリング
  const CustomCheckBox = styled(Checkbox)({
    color: "#003399",
    "&.Mui-checked": {
      color: "#003399",
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(SearchSchoolSchema),
    defaultValues: {
      totalTuitionFeeValue: [0, 1000000],
      movingOutsideThePrefecture: "",
      commutingStyle: "",
      highSchool: "",
      attendanceFrequency: [],
    },
  });

  // ユーザーが選択した値を監視
  const totalTuitionFeeValue = watch("totalTuitionFeeValue");

  useFormSynchro();

  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    handleFormSubmit(data, router, onClose);
  };

  return (
    <>
      <Container>
        <Card
          sx={{
            mt: 3,
            border: `0.5px solid #FF6600`,
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
          }}
        >
          <CardActions
            sx={{
              justifyContent: "flex-end",
              position: "sticky",
              top: 0,
              width: "100%",
              backgroundColor: "#fff",
              zIndex: 10,
              borderBottom: "1px solid #ddd",
            }}
          >
            <Button
              onClick={onClose}
              sx={{
                color: "#000000",
                mr: 1,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <CloseIcon style={{ color: "#000000" }} />
            </Button>
          </CardActions>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent
              sx={{
                px: 6,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {/* 3年間の学費総額 */}
              <Box>
                <Typography
                  id="totalTuitionFeeSlider"
                  sx={{ fontWeight: 600, display: "flex", gap: 1 }}
                  gutterBottom
                >
                  <CurrencyYenIcon style={{ color: "#000000" }} />
                  3年間の学費総額
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    ml: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    height: 32,
                  }}
                >
                  <CurrencyYenIcon style={{ color: "#000000", fontSize: 20 }} />
                  {totalTuitionFeeValue[0].toLocaleString("ja-JP")} 〜
                  <CurrencyYenIcon style={{ color: "#000000", fontSize: 20 }} />
                  {totalTuitionFeeValue[1].toLocaleString("ja-JP")}
                </Typography>
                <Controller
                  name="totalTuitionFeeValue"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      value={field.value || [0, 1000000]}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      min={0}
                      step={100000}
                      max={4000000}
                      valueLabelDisplay="auto"
                      aria-labelledby="totalTuitionFeeSlider"
                      sx={{
                        width: "100%",
                        color: "#003399",
                        "& .MuiSlider-thumb": {
                          backgroundColor: "#003399",
                          "&:hover, &.Mui-focusVisible": {
                            boxShadow: "none",
                          },
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "#003399",
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "#b0c4de",
                        },
                      }}
                    />
                  )}
                />
              </Box>

              {/* スクーリング会場 */}
              <Box>
                <Typography
                  id="movingOutsideThePrefecture"
                  sx={{ fontWeight: 600, display: "flex", gap: 1 }}
                  gutterBottom
                >
                  <BusinessIcon style={{ color: "#000000" }} />
                  スクーリング会場
                </Typography>
                <Controller
                  name="movingOutsideThePrefecture"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <RadioGroup
                        {...field}
                        row
                        sx={{
                          gap: 1,
                          pb: 1,
                        }}
                        aria-labelledby="movingOutsideThePrefecture"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="true"
                          control={<CustomRadio disableRipple />}
                          label="県外"
                        />
                        <FormControlLabel
                          value="false"
                          control={<CustomRadio disableRipple />}
                          label="県内"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
                {errors.movingOutsideThePrefecture && (
                  <FormHelperText error sx={{ fontSize: "1rem" }}>
                    {errors.movingOutsideThePrefecture.message}
                  </FormHelperText>
                )}
              </Box>

              {/* 学校の種類 */}
              <Box>
                <Typography
                  id="highSchool"
                  sx={{ fontWeight: 600, display: "flex", gap: 1 }}
                  gutterBottom
                >
                  <SchoolIcon style={{ color: "#000000" }} />
                  学校の種類
                </Typography>
                <Controller
                  name="highSchool"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <RadioGroup
                        {...field}
                        row
                        sx={{
                          gap: 1,
                          pb: 1,
                        }}
                        aria-labelledby="highSchool"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="通信制高等学校"
                          control={<CustomRadio disableRipple />}
                          label="通信制高校"
                        />
                        <FormControlLabel
                          value="サポート校"
                          control={<CustomRadio disableRipple />}
                          label="サポート校"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
                {errors.highSchool && (
                  <FormHelperText error sx={{ fontSize: "1rem" }}>
                    {errors.highSchool.message}
                  </FormHelperText>
                )}
              </Box>

              {/* 通学形態 */}
              <Box>
                <Typography
                  id="commutingStyle"
                  sx={{ fontWeight: 600, display: "flex", gap: 1 }}
                  gutterBottom
                >
                  <ComputerIcon style={{ color: "#000000" }} />
                  通学形態
                </Typography>
                <Controller
                  name="commutingStyle"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <RadioGroup
                        {...field}
                        row
                        sx={{
                          gap: 1,
                          pb: 1,
                        }}
                        aria-labelledby="commutingStyle"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="通学"
                          control={<CustomRadio disableRipple />}
                          label="通学"
                        />
                        <FormControlLabel
                          value="オンライン"
                          control={<CustomRadio disableRipple />}
                          label="オンライン"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
                {errors.commutingStyle && (
                  <FormHelperText error sx={{ fontSize: "1rem" }}>
                    {errors.commutingStyle.message}
                  </FormHelperText>
                )}
              </Box>

              {/* 登校頻度 */}
              <Box>
                <Typography
                  id="attendance-frequency"
                  sx={{ fontWeight: 600, display: "flex", gap: 1 }}
                  gutterBottom
                >
                  <CalendarMonthIcon style={{ color: "#000000" }} />
                  登校頻度
                </Typography>

                <Controller
                  name="attendanceFrequency"
                  control={control}
                  render={({ field }) => {
                    const handleChange = (
                      event: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const { value, checked } = event.target;
                      const currentValue = (field.value || []) as string[];
                      const newValue = checked
                        ? [...currentValue, value]
                        : currentValue.filter((v) => v !== value);
                      field.onChange(newValue);
                    };
                    return (
                      <FormControl component="fieldset">
                        <FormGroup row sx={{ gap: 2, pb: 1 }}>
                          {attendanceOptions.map((option) => (
                            <FormControlLabel
                              key={option}
                              control={
                                <CustomCheckBox
                                  checked={(field.value || []).includes(option)}
                                  onChange={handleChange}
                                  value={option}
                                  disableRipple
                                />
                              }
                              label={option}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    );
                  }}
                />
                {errors.attendanceFrequency && (
                  <FormHelperText error sx={{ fontSize: "1rem" }}>
                    {errors.attendanceFrequency.message}
                  </FormHelperText>
                )}
              </Box>
            </CardContent>

            <CardActions
              sx={{
                pb: 1,
                justifyContent: "center",
                position: "sticky",
                bottom: 0,
                backgroundColor: "#fff",
                zIndex: 10,
                borderTop: "1px solid #ddd",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#003399",
                  fontWeight: "bold",
                  width: "80%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    backgroundColor: "#003399",
                    transform: "scale(0.95)",
                  },
                }}
              >
                検索
              </Button>
            </CardActions>
          </form>
        </Card>
      </Container>
    </>
  );
};
