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
  initialSetupCosts: z.number().min(1, "初期費用を選択してください。"),
  tuitionFee: z.number().min(1, "授業料を選択してください。"),
  testFee: z.number().min(1, "受験料を選択してください。"),
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
  const CustomRadio = styled(Radio)({
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
      initialSetupCosts: 0, // 初期値設定
      tuitionFee: 0,
      testFee: 0,
      movingOutsideThePrefecture: "",
      commutingStyle: "",
      highSchool: "",
      attendanceFrequency: "",
      // fireStoreのコレクションを追加
    },
  });

  // ユーザーが選択した値を監視
  const initialSetupCostsValue = watch("initialSetupCosts");
  const testFeeValue = watch("testFee");
  const tuitionFeeValue = watch("tuitionFee");
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
      initialSetupCosts: data.initialSetupCosts.toString(), // number型を文字列に変換
      tuitionFee: data.tuitionFee.toString(), // number型を文字列に変換
      testFee: data.testFee.toString(), // number型を文字列に変換
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
          testFee: doc.data().testFee,
        }))
        .filter(
          (school) => typeof school.testFee === "number" && school.testFee >= 0
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
            border: `2px solid #003399`,
          }}
        >
          {/* 検索窓 */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* number型データ */}
            <Box>
              {/* 初期費用スライダー */}
              <Box sx={{ my: 4 }}>
                <Typography
                  id="initialSetupCostsSlider"
                  sx={{ fontWeight: 600 }}
                  gutterBottom
                >
                  1年次の初期費用：￥
                  {initialSetupCostsValue.toLocaleString("ja-JP")}
                </Typography>
                <Controller
                  name="initialSetupCosts"
                  control={control}
                  rules={{ required: "初期費用を選択してください。" }}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      min={0}
                      step={100000}
                      max={1000000}
                      valueLabelDisplay="auto"
                      aria-labelledby="initialSetupCostsSlider"
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
                {errors.initialSetupCosts && (
                  <FormHelperText error sx={{ fontSize: "1rem" }}>
                    {errors.initialSetupCosts.message}
                  </FormHelperText>
                )}
              </Box>

              {/* 授業料スライダー */}
              <Box sx={{ my: 4 }}>
                <Typography
                  id="tuitionFeeSlider"
                  sx={{ fontWeight: 600 }}
                  gutterBottom
                >
                  3年間の授業料：￥{tuitionFeeValue.toLocaleString("ja-JP")}
                </Typography>
                <Controller
                  name="tuitionFee"
                  control={control}
                  rules={{ required: "授業料を選択してください。" }}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      min={0}
                      step={200000}
                      max={2600000}
                      valueLabelDisplay="auto"
                      aria-labelledby="tuitionFeeSlider"
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
                {errors.tuitionFee && (
                  <FormHelperText error sx={{ fontSize: "1rem" }}>
                    {errors.tuitionFee.message}
                  </FormHelperText>
                )}
              </Box>

              {/* 受験料スライダー */}
              <Box sx={{ my: 4 }}>
                <Typography
                  id="testFeeSlider"
                  sx={{ fontWeight: 600 }}
                  gutterBottom
                >
                  受験料：￥{testFeeValue.toLocaleString("ja-JP")}
                </Typography>
                <Controller
                  name="testFee"
                  control={control}
                  rules={{ required: "受験料を選択してください。" }}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      min={0}
                      step={5000}
                      max={20000}
                      valueLabelDisplay="auto"
                      aria-labelledby="testFeeSlider"
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
                {errors.testFee && (
                  <FormHelperText error sx={{ fontSize: "1rem" }}>
                    {errors.testFee.message}
                  </FormHelperText>
                )}
              </Box>
            </Box>

            {/* boolean型データ */}
            <Box>
              {/* 県外移動があるかどうか */}
              <Box sx={{ my: 4 }}>
                <Typography
                  id="movingOutsideThePrefecture"
                  sx={{ fontWeight: 600 }}
                  gutterBottom
                >
                  県外移動
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
                          label="県外移動有り"
                        />
                        <FormControlLabel
                          value="false"
                          control={<CustomRadio />}
                          label="県外移動無し"
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
                  backgroundColor: "#FF6600",
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
