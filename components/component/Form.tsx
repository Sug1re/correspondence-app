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
  CardActions,
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

// Searchページのモーダルを閉じる関数
interface FormProps {
  handleClose: () => void;
}

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

const Form: React.FC<FormProps> = ({ handleClose }) => {
  // Radioのカラーリング
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
    handleClose(); // モーダルを閉じる
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
              left: 0,
              width: "100%",
              backgroundColor: "#fff", // 背景色
              zIndex: 10, // 前面に表示
              borderBottom: "1px solid #ddd", // 境界線
              py: 1, // 余白
            }}
          >
            <Button onClick={handleClose} sx={{ color: "#000000" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </CardActions>

          <Box sx={{ px: 3, pt: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* 3年間の学費総額 */}
              <Box>
                <Typography
                  id="totalTuitionFeeSlider"
                  sx={{ fontWeight: 600, display: "flex", gap: 1 }}
                  gutterBottom
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-orange-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 7.5 3 4.5m0 0 3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
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

              {/* スクーリング会場 */}
              <Box>
                <Typography
                  id="movingOutsideThePrefecture"
                  sx={{ fontWeight: 600, display: "flex", gap: 1 }}
                  gutterBottom
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6  text-orange-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                    />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-orange-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                    />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-orange-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
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
                          pb: 1,
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
              <Box>
                <Typography
                  id="attendance-frequency"
                  sx={{ fontWeight: 600, display: "flex", gap: 1 }}
                  gutterBottom
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6  text-orange-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
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
                          pb: 1,
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
                          disabled={commutingStyleValue === "オンライン"}
                        />
                        <FormControlLabel
                          value="週3"
                          control={<CustomRadio />}
                          label="週3"
                          disabled={commutingStyleValue === "オンライン"}
                        />
                        <FormControlLabel
                          value="週4"
                          control={<CustomRadio />}
                          label="週4"
                          disabled={commutingStyleValue === "オンライン"}
                        />
                        <FormControlLabel
                          value="週5"
                          control={<CustomRadio />}
                          label="週5"
                          disabled={commutingStyleValue === "オンライン"}
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
                          disabled={commutingStyleValue === "オンライン"}
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
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Form;
