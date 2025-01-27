"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";

// React Hook Form の設定
type FormValues = {
  initialSetupCosts: number;
  testFee: number;
  tuitionFee: number;
  attendanceFrequency: string;
  highSchool: string;
  // fireStoreのコレクションを追加
};

const Form = () => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      initialSetupCosts: 10, // 初期値設定
      testFee: 10,
      tuitionFee: 10,
      attendanceFrequency: "登校スタイルを選択",
      highSchool: "学校の種類を選択",
      // fireStoreのコレクションを追加
    },
  });

  // ユーザーが選択したデータを可視化
  const initialSetupCostsValue = watch("initialSetupCosts");
  const attendanceFrequencyValue = watch("attendanceFrequency");
  const testFeeValue = watch("testFee");
  const tuitionFeeValue = watch("tuitionFee");
  const highSchoolValue = watch("highSchool");
  // fireStoreのコレクションを追加

  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    // フォームの値を取得
    const { initialSetupCosts } = data;
    const { testFee } = data;
    const { tuitionFee } = data;
    const { attendanceFrequency } = data;
    const { highSchool } = data;
    // fireStoreのコレクションを追加

    // クエリパラメータを生成して検索ページへ遷移
    const query = new URLSearchParams({
      initialSetupCosts: initialSetupCosts.toString(), // number型を文字列に変換
      testFee: testFee.toString(), // number型を文字列に変換
      tuitionFee: tuitionFee.toString(), // number型を文字列に変換
      attendanceFrequency: attendanceFrequency,
      highSchool: highSchool,

      // fireStoreのコレクションを追加
    }).toString();

    router.push(`/search?${query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 学費スライダー */}
      <Box sx={{ my: 4 }}>
        <Typography
          id="initialSetupCostsSlider"
          sx={{ fontWeight: 600 }}
          gutterBottom
        >
          初期費用（万円）：{initialSetupCostsValue}万円
        </Typography>
        <Controller
          name="initialSetupCosts"
          control={control}
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
      </Box>

      {/* 受験料スライダー */}
      <Box sx={{ my: 4 }}>
        <Typography id="testFeeSlider" sx={{ fontWeight: 600 }} gutterBottom>
          受験料（万円）：{testFeeValue}万円
        </Typography>
        <Controller
          name="testFee"
          control={control}
          render={({ field }) => (
            <Slider
              {...field}
              min={0}
              step={0.5}
              max={10}
              valueLabelDisplay="auto"
              aria-labelledby="testFeeSlider"
            />
          )}
        />
      </Box>

      {/* 授業料スライダー */}
      <Box sx={{ my: 4 }}>
        <Typography id="tuitionFeeSlider" sx={{ fontWeight: 600 }} gutterBottom>
          授業料（万円）：{tuitionFeeValue}万円
        </Typography>
        <Controller
          name="tuitionFee"
          control={control}
          render={({ field }) => (
            <Slider
              {...field}
              min={0}
              step={0.5}
              max={100}
              valueLabelDisplay="auto"
              aria-labelledby="tuitionFeeSlider"
            />
          )}
        />
      </Box>

      {/* 学校の種類 */}
      <Box sx={{ my: 4 }}>
        <Typography id="highSchool" sx={{ fontWeight: 600 }} gutterBottom>
          学校の種類：{highSchoolValue}
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
      </Box>

      {/* 登校頻度 */}
      <Box sx={{ my: 4 }}>
        <Typography
          id="attendance-frequency"
          sx={{ fontWeight: 600 }}
          gutterBottom
        >
          登校スタイル：{attendanceFrequencyValue}
        </Typography>
        <Controller
          name="attendanceFrequency"
          control={control}
          render={({ field }) => (
            <FormControl>
              <RadioGroup
                {...field} // field.value と field.onChange を適用
                row // 横並びにするプロパティ
                sx={{
                  gap: 1,
                }}
                aria-labelledby="attendance-frequency"
                name="radio-buttons-group"
              >
                <FormControlLabel value="週1" control={<Radio />} label="週1" />
                <FormControlLabel value="週2" control={<Radio />} label="週2" />
                <FormControlLabel value="週3" control={<Radio />} label="週3" />
                <FormControlLabel value="週4" control={<Radio />} label="週4" />
                <FormControlLabel value="週5" control={<Radio />} label="週5" />
                <FormControlLabel
                  value="オンライン"
                  control={<Radio />}
                  label="オンライン"
                />
                <FormControlLabel
                  value="プログラミング通学"
                  control={<Radio />}
                  label="プログラミング通学"
                />
              </RadioGroup>
            </FormControl>
          )}
        />
      </Box>

      {/* 検索ボタン */}
      <Box sx={{ my: 3 }}>
        <Button variant="contained" type="submit">
          検索
        </Button>
      </Box>
    </form>
  );
};
export default Form;
