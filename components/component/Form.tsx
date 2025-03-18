"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Slider,
  styled,
  Typography,
} from "@mui/material";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";

// Zodスキーマの定義
const formSchema = z.object({
  totalTuitionFee: z.number().min(1, "学費総額を選択してください。"),
  movingOutsideThePrefecture: z
    .string()
    .refine((val) => val !== "", {
      message: "県外移動の有無を選択してください。",
    })
    .refine((val) => ["true", "false"].includes(val), {
      message: "県外移動の有無を正しく選択してください。",
    }),
  commutingStyle: z
    .string()
    .refine((val) => val !== "", { message: "通学形態を選択してください。" })
    .refine((val) => ["通学", "オンライン"].includes(val), {
      message: "通学形態を正しく選択してください。",
    }),
  highSchool: z
    .string()
    .refine((val) => val !== "", { message: "学校の種類を選択してください。" })
    .refine((val) => ["通信制高等学校", "サポート校"].includes(val), {
      message: "学校の種類を正しく選択してください。",
    }),
  attendanceFrequency: z
    .string()
    .refine((val) => val !== "", { message: "登校頻度を選択してください。" })
    .refine(
      (val) =>
        ["週1", "週2", "週3", "週4", "週5", "オンライン", "自由"].includes(val),
      { message: "登校頻度を正しく選択してください。" }
    ),
});

type FormValues = z.infer<typeof formSchema>;

const Form = () => {
  // Radioのカラーリング
  const CustomRadio = styled(Radio)({
    color: "#003399",
    "&.Mui-checked": {
      color: "#003399",
    },
  });

  // sliderの最小値と最大値を管理
  // const []= useState(0);
  // const []= useState(1000000);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalTuitionFee: 0,
      movingOutsideThePrefecture: "",
      commutingStyle: "",
      highSchool: "",
      attendanceFrequency: "",
      // fireStoreのコレクションを追加
    },
  });

  // ユーザーが選択した値を監視
  const totalTuitionFeeValue = watch("totalTuitionFee");
  const commutingStyleValue = watch("commutingStyle");
  const attendanceFrequencyValue = watch("attendanceFrequency");
  // fireStoreのコレクションを追加

  const router = useRouter();

  // 通学形態と登校頻度の連動ロジック
  const [disableOnline, setDisableOnline] = useState(false);

  useEffect(() => {
    if (commutingStyleValue === "通学") {
      setDisableOnline(true);
      if (attendanceFrequencyValue === "オンライン") {
        setValue("attendanceFrequency", "");
      }
    } else if (commutingStyleValue === "オンライン") {
      setDisableOnline(false);
    }
  }, [commutingStyleValue, setValue, attendanceFrequencyValue]);

  useEffect(() => {
    if (attendanceFrequencyValue === "通学") {
      setDisableOnline(true);
      if (commutingStyleValue === "オンライン") {
        setValue("attendanceFrequency", "");
      }
    } else if (attendanceFrequencyValue === "オンライン") {
      setDisableOnline(false);
    }
  }, [commutingStyleValue, setValue, attendanceFrequencyValue]);

  const onSubmit = (data: FormValues) => {
    // クエリパラメータを生成して検索ページへ遷移
    const query = new URLSearchParams({
      // フォームの値を取得
      totalTuitionFee: data.totalTuitionFee.toString(),
      movingOutsideThePrefecture: data.movingOutsideThePrefecture,
      commutingStyle: data.commutingStyle,
      highSchool: data.highSchool,
      attendanceFrequency: data.attendanceFrequency,
      // fireStoreのコレクションを追加
    }).toString();

    router.push(`/search?${query}`);
  };

  // fireStore から全データが取得できているか確認
  useEffect(() => {
    const fetchSchools = async () => {
      const schoolRef = collection(db, "schools");
      const q = query(schoolRef);
      const snapshot = await getDocs(q);
      const schoolsData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          totalTuitionFee: doc.data().totalTuitionFee,
        }))
        .filter(
          (school) =>
            typeof school.totalTuitionFee === "number" &&
            school.totalTuitionFee >= 0
        );
      console.log(schoolsData);
    };
    fetchSchools();
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Card
          sx={{
            mt: 2,
            px: 3,
            border: `2px solid #FF6600`,
          }}
        >
          {/* 検索窓 */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* number型データ */}
            <Box>
              {/* 学費総額スライダー */}
              <Box sx={{ my: 4 }}>
                <Typography
                  id="totalTuitionFeeSlider"
                  sx={{ fontWeight: 600 }}
                  gutterBottom
                >
                  3年間の学費総額：￥
                  {totalTuitionFeeValue.toLocaleString("ja-JP")}
                </Typography>
                <Controller
                  name="totalTuitionFee"
                  control={control}
                  rules={{ required: "初期費用を選択してください。" }}
                  render={({ field }) => (
                    <Slider
                      {...field}
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
                {errors.totalTuitionFee && (
                  <FormHelperText error sx={{ fontSize: "1rem" }}>
                    {errors.totalTuitionFee.message}
                  </FormHelperText>
                )}
              </Box>
            </Box>

            {/* boolean型データ */}
            {/* スクーリング会場 */}
            <Box sx={{ my: 4 }}>
              <Typography
                id="movingOutsideThePrefecture"
                sx={{ fontWeight: 600 }}
                gutterBottom
              >
                スクーリング会場
              </Typography>
              <Controller
                name="movingOutsideThePrefecture"
                control={control}
                rules={{ required: "県外移動の有無を選択してください。" }}
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      {...field} // field.value と field.onChange を適用
                      row // 横並びにするプロパティ
                      sx={{
                        gap: 1,
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

            {/* string型データ */}
            <Box>
              {/* 学校の種類 */}
              <Box sx={{ my: 4 }}>
                <Typography
                  id="highSchool"
                  sx={{ fontWeight: 600 }}
                  gutterBottom
                >
                  学校の種類
                </Typography>
                <Controller
                  name="highSchool"
                  control={control}
                  rules={{ required: "学校の種類を選択してください。" }}
                  render={({ field }) => (
                    <FormControl>
                      <RadioGroup
                        {...field} // field.value と field.onChange を適用
                        row // 横並びにするプロパティ
                        sx={{
                          gap: 1,
                        }}
                        aria-labelledby="highSchool"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="通信制高等学校"
                          control={<CustomRadio />}
                          label="通信制高等学校"
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
              <Box sx={{ my: 4 }}>
                <Typography
                  id="commutingStyle"
                  sx={{ fontWeight: 600 }}
                  gutterBottom
                >
                  通学形態
                </Typography>
                <Controller
                  name="commutingStyle"
                  control={control}
                  rules={{ required: "通学形態を選択してください。" }}
                  render={({ field }) => (
                    <FormControl>
                      <RadioGroup
                        {...field} // field.value と field.onChange を適用
                        row // 横並びにするプロパティ
                        sx={{
                          gap: 1,
                        }}
                        aria-labelledby="commutingStyle"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="通学"
                          control={<CustomRadio />}
                          label="通学"
                          disabled={attendanceFrequencyValue === "オンライン"} // 登校頻度が「オンライン」の場合、通学を無効化
                        />
                        <FormControlLabel
                          value="オンライン"
                          control={<CustomRadio />}
                          label="オンライン"
                          disabled={[
                            "週1",
                            "週2",
                            "週3",
                            "週4",
                            "週5",
                            "自由",
                          ].includes(attendanceFrequencyValue)} // 登校頻度が「オンライン」の場合、通学を無効化
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
              <Box sx={{ my: 4 }}>
                <Typography
                  id="attendance-frequency"
                  sx={{ fontWeight: 600 }}
                  gutterBottom
                >
                  登校頻度
                </Typography>
                <Controller
                  name="attendanceFrequency"
                  control={control}
                  rules={{ required: "登校頻度を選択してください。" }}
                  render={({ field }) => (
                    <FormControl>
                      <RadioGroup
                        {...field} // field.value と field.onChange を適用
                        row // 横並びにするプロパティ
                        sx={{
                          gap: 2,
                        }}
                        aria-labelledby="attendance-frequency"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="週1"
                          control={<CustomRadio />}
                          label="週1"
                          disabled={commutingStyleValue === "オンライン"} // Disable if "オンライン" is selected
                        />
                        <FormControlLabel
                          value="週2"
                          control={<CustomRadio />}
                          label="週2"
                          disabled={commutingStyleValue === "オンライン"} // Disable if "オンライン" is selected
                        />
                        <FormControlLabel
                          value="週3"
                          control={<CustomRadio />}
                          label="週3"
                          disabled={commutingStyleValue === "オンライン"} // Disable if "オンライン" is selected
                        />
                        <FormControlLabel
                          value="週4"
                          control={<CustomRadio />}
                          label="週4"
                          disabled={commutingStyleValue === "オンライン"} // Disable if "オンライン" is selected
                        />
                        <FormControlLabel
                          value="週5"
                          control={<CustomRadio />}
                          label="週5"
                          disabled={commutingStyleValue === "オンライン"} // Disable if "オンライン" is selected
                        />
                        <FormControlLabel
                          value="オンライン"
                          control={<CustomRadio />}
                          label="オンライン"
                          disabled={disableOnline} // 無効化ロジック
                        />
                        <FormControlLabel
                          value="自由"
                          control={<CustomRadio />}
                          label="自由"
                          disabled={commutingStyleValue === "オンライン"} // Disable if "オンライン" is selected
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
                {errors.attendanceFrequency && (
                  <FormHelperText error sx={{ fontSize: "1rem" }}>
                    {errors.attendanceFrequency.message}
                  </FormHelperText>
                )}
              </Box>
            </Box>

            {/* 検索ボタン */}
            <Box sx={{ pb: 3 }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#003399",
                  fontWeight: "bold",
                  width: "100%", // ボタンの幅をフルに設定
                  transition: "transform 0.2s ease-in-out", // スムーズなスケールアニメーション
                  "&:hover": {
                    transform: "scale(0.95)", // ホバー時のスケール
                  },
                }}
              >
                検索
              </Button>
            </Box>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default Form;
