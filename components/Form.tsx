"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { formSchema, FormValues } from "@/lib/validation/formSchema";
import { handleFormSubmit } from "@/lib/handlers/handleFormSubmit";
import * as Icon from "@/components/icons/index";
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

// Formコンポーネント内を細かく切り出す

const attendanceOptions = [
  "週1",
  "週2",
  "週3",
  "週4",
  "週5",
  "オンライン",
  "自由",
];

// Searchページのモーダルを閉じる関数
interface FormProps {
  handleClose: () => void;
}

const Form: React.FC<FormProps> = ({ handleClose }) => {
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
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
  const commutingStyleValue = watch("commutingStyle");

  // commutingStyleとattendanceFrequencyの連動ロジック
  useEffect(() => {
    const attendanceFrequencyValue = watch("attendanceFrequency") || [];

    if (commutingStyleValue === "オンライン") {
      // オンライン選択時：「オンライン」のみにする
      if (!attendanceFrequencyValue.includes("オンライン")) {
        setValue("attendanceFrequency", ["オンライン"]);
      }
    } else if (commutingStyleValue === "通学") {
      // 通学選択時：「オンライン」を除外する
      if (attendanceFrequencyValue.includes("オンライン")) {
        const newValue = attendanceFrequencyValue.filter(
          (v) => v !== "オンライン"
        );
        setValue("attendanceFrequency", newValue);
      }
    }
  }, [commutingStyleValue, setValue, watch]);

  const router = useRouter();

  // lib/handleFormSubmit
  const onSubmit = (data: FormValues) => {
    handleFormSubmit(data, router, handleClose);
  };

  return (
    <>
      <Container>
        {/* 検索窓 */}
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
              backgroundColor: "#fff", // 背景色
              zIndex: 10, // 前面に表示
              borderBottom: "1px solid #ddd", // 境界線
            }}
          >
            <Button onClick={handleClose} sx={{ color: "#000000" }}>
              <Icon.CloseIcon />
            </Button>
          </CardActions>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent
              sx={{
                px: 2,
              }}
            >
              {/* 3年間の学費総額 */}
              <Box>
                <Typography
                  id="totalTuitionFeeSlider"
                  sx={{ fontWeight: 600, display: "flex", gap: 1 }}
                  gutterBottom
                >
                  <Icon.YenIcon />
                  3年間の学費総額
                </Typography>
                <Typography sx={{ fontWeight: 600, ml: 2 }}>
                  ￥{totalTuitionFeeValue[0].toLocaleString("ja-JP")} 〜 ￥
                  {totalTuitionFeeValue[1].toLocaleString("ja-JP")}
                </Typography>
                <Controller
                  name="totalTuitionFeeValue"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      value={field.value || [0, 1000000]} // 初期値を範囲に設定
                      onChange={(_, newValue) => field.onChange(newValue)}
                      min={0}
                      step={100000}
                      max={4000000}
                      valueLabelDisplay="auto"
                      aria-labelledby="totalTuitionFeeSlider"
                      sx={{
                        color: "#003399", // スライダーの色を変更
                        "& .MuiSlider-thumb": {
                          backgroundColor: "#003399", // 進捗部分の色を変更
                        },
                        "& .MuiSlider-track": {
                          backgroundColor: "#003399", // 丸いスライダーの色を変更
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: "#b0c4de", // 未選択部分の色を薄めの青に
                        },
                      }}
                    />
                  )}
                />
                <FormHelperText error sx={{ fontSize: "1rem" }}>
                  {errors.totalTuitionFeeValue?.[0]?.message}
                </FormHelperText>
                <FormHelperText error sx={{ fontSize: "1rem" }}>
                  {errors.totalTuitionFeeValue?.[1]?.message}
                </FormHelperText>
              </Box>

              {/* スクーリング会場 */}
              <Box>
                <Typography
                  id="movingOutsideThePrefecture"
                  sx={{ fontWeight: 600, display: "flex", gap: 1 }}
                  gutterBottom
                >
                  <Icon.OfficeIcon />
                  スクーリング会場
                </Typography>
                <Controller
                  name="movingOutsideThePrefecture"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <RadioGroup
                        {...field} // field.value と field.onChange を適用
                        row // 横並びにするプロパティ
                        sx={{
                          gap: 1,
                          pb: 1,
                        }}
                        aria-labelledby="movingOutsideThePrefecture"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="true"
                          control={<CustomRadio />}
                          label="県外"
                        />
                        <FormControlLabel
                          value="false"
                          control={<CustomRadio />}
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
                  <Icon.SchoolIcon />
                  学校の種類
                </Typography>
                <Controller
                  name="highSchool"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <RadioGroup
                        {...field} // field.value と field.onChange を適用
                        row // 横並びにするプロパティ
                        sx={{
                          gap: 1,
                          pb: 1,
                        }}
                        aria-labelledby="highSchool"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="通信制高等学校"
                          control={<CustomRadio />}
                          label="通信制高校"
                        />
                        <FormControlLabel
                          value="サポート校"
                          control={<CustomRadio />}
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
                  <Icon.TvIcon />
                  通学形態
                </Typography>
                <Controller
                  name="commutingStyle"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <RadioGroup
                        {...field} // field.value と field.onChange を適用
                        row // 横並びにするプロパティ
                        sx={{
                          gap: 1,
                          pb: 1,
                        }}
                        aria-labelledby="commutingStyle"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="通学"
                          control={<CustomRadio />}
                          label="通学"
                        />
                        <FormControlLabel
                          value="オンライン"
                          control={<CustomRadio />}
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
                  <Icon.CalendarIcon />
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
                          {attendanceOptions.map((option) => {
                            const isDisabled =
                              (commutingStyleValue === "オンライン" &&
                                option !== "オンライン") ||
                              (commutingStyleValue === "通学" &&
                                option === "オンライン");

                            return (
                              <FormControlLabel
                                key={option}
                                control={
                                  <CustomCheckBox
                                    checked={(field.value || []).includes(
                                      option
                                    )}
                                    onChange={handleChange}
                                    value={option}
                                    disabled={isDisabled} // 🔥 ここがポイント
                                  />
                                }
                                label={option}
                              />
                            );
                          })}
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

            {/* 検索ボタン */}
            <CardActions
              sx={{
                pb: 1,
                justifyContent: "center",
                position: "sticky",
                bottom: 0,
                backgroundColor: "#fff", // 背景色
                zIndex: 10, // 前面に表示
                borderTop: "1px solid #ddd", // 境界線
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#003399",
                  fontWeight: "bold",
                  width: "80%", // ボタンの幅をフルに設定
                  boxShadow: "0px 4px 10px rgba(255, 102, 0, 0.4)",
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

export default Form;
