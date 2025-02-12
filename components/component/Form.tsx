"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";

// // fireStore の型定義
// type School = {
//   id: string;
//   name: string;
//   course: string;
//   initialSetupCosts: number;
//   tuitionFee: number;
//   testFee: number;
//   schooling: boolean;
//   movingOutsideThePrefecture: boolean;
//   commutingStyle: string;
//   highSchool: string;
//   attendanceFrequency: string[];
// };

// Zodスキーマの定義
const formSchema = z.object({
  initialSetupCosts: z.number().min(1, "初期費用を選択してください。"),
  tuitionFee: z.number().min(1, "授業料を選択してください。"),
  testFee: z.number().min(1, "受験料を選択してください。"),
  schooling: z
    .string()
    .refine((val) => val !== "", {
      message: "スクーリングの有無を選択してください。",
    })
    .refine((val) => ["true", "false"].includes(val), {
      message: "スクーリングの有無を正しく選択してください。",
    }),
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
      schooling: "",
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
      schooling: data.schooling,
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
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            検索条件
          </Typography>
        </Box>

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
                1年次の初期費用（万円）：{initialSetupCostsValue}万円
              </Typography>
              <Controller
                name="initialSetupCosts"
                control={control}
                rules={{ required: "初期費用を選択してください。" }}
                render={({ field }) => (
                  <Slider
                    {...field}
                    min={0}
                    step={0.5}
                    max={200}
                    valueLabelDisplay="auto"
                    aria-labelledby="initialSetupCostsSlider"
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
                3年間の授業料（万円）：{tuitionFeeValue}万円
              </Typography>
              <Controller
                name="tuitionFee"
                control={control}
                rules={{ required: "授業料を選択してください。" }}
                render={({ field }) => (
                  <Slider
                    {...field}
                    min={0}
                    step={0.5}
                    max={300}
                    valueLabelDisplay="auto"
                    aria-labelledby="tuitionFeeSlider"
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
                受験料（万円）：{testFeeValue}万円
              </Typography>
              <Controller
                name="testFee"
                control={control}
                rules={{ required: "受験料を選択してください。" }}
                render={({ field }) => (
                  <Slider
                    {...field}
                    min={0}
                    step={0.5}
                    max={3}
                    valueLabelDisplay="auto"
                    aria-labelledby="testFeeSlider"
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
            {/* スクーリングの有無 */}
            <Box sx={{ my: 4 }}>
              <Typography id="schooling" sx={{ fontWeight: 600 }} gutterBottom>
                スクーリング
              </Typography>
              <Controller
                name="schooling"
                control={control}
                rules={{ required: "スクーリングの有無を選択してください。" }}
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      {...field} // field.value と field.onChange を適用
                      row // 横並びにするプロパティ
                      sx={{
                        gap: 1,
                      }}
                      aria-labelledby="schooling"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="スクーリング有り"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="スクーリング無し"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
              {errors.schooling && (
                <FormHelperText error sx={{ fontSize: "1rem" }}>
                  {errors.schooling.message}
                </FormHelperText>
              )}
            </Box>

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
                        control={<Radio />}
                        label="県外移動有り"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
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
              <Typography id="highSchool" sx={{ fontWeight: 600 }} gutterBottom>
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
                        control={<Radio />}
                        label="通信制高等学校"
                      />
                      <FormControlLabel
                        value="サポート校"
                        control={<Radio />}
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
                        control={<Radio />}
                        label="通学"
                        disabled={attendanceFrequencyValue === "オンライン"} // 登校頻度が「オンライン」の場合、通学を無効化
                      />
                      <FormControlLabel
                        value="オンライン"
                        control={<Radio />}
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
                        control={<Radio />}
                        label="週1"
                        disabled={commutingStyleValue === "オンライン"} // Disable if "オンライン" is selected
                      />
                      <FormControlLabel
                        value="週2"
                        control={<Radio />}
                        label="週2"
                        disabled={commutingStyleValue === "オンライン"} // Disable if "オンライン" is selected
                      />
                      <FormControlLabel
                        value="週3"
                        control={<Radio />}
                        label="週3"
                        disabled={commutingStyleValue === "オンライン"} // Disable if "オンライン" is selected
                      />
                      <FormControlLabel
                        value="週4"
                        control={<Radio />}
                        label="週4"
                        disabled={commutingStyleValue === "オンライン"} // Disable if "オンライン" is selected
                      />
                      <FormControlLabel
                        value="週5"
                        control={<Radio />}
                        label="週5"
                        disabled={commutingStyleValue === "オンライン"} // Disable if "オンライン" is selected
                      />
                      <FormControlLabel
                        value="オンライン"
                        control={<Radio />}
                        label="オンライン"
                        disabled={disableOnline} // 無効化ロジック
                      />
                      <FormControlLabel
                        value="自由"
                        control={<Radio />}
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
          <Box sx={{ pb: 8 }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
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
      </Container>
    </>
  );
};
export default Form;
