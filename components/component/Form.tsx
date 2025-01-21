"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
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
import { useRouter } from "next/navigation";
// React Hook Form の設定
type FormValues = {
  tuition: number;
  attendanceFrequency: string;
  // fireStoreのコレクションを追加
};
const Form = () => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      tuition: 10, // 初期値設定
      attendanceFrequency: "登校スタイルを選択",
      // fireStoreのコレクションを追加
    },
  });
  // ユーザーが選択したデータを可視化
  const tuitionValue = watch("tuition");
  const attendanceFrequencyValue = watch("attendanceFrequency");
  // fireStoreのコレクションを追加

  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    // フォームの値を取得
    const { tuition } = data;
    const { attendanceFrequency } = data;
    // fireStoreのコレクションを追加
    // クエリパラメータを生成して検索ページへ遷移
    const query = new URLSearchParams({
      tuition: tuition.toString(), // number型を文字列に変換
      attendanceFrequency: attendanceFrequency,
      // fireStoreのコレクションを追加
    }).toString();

    router.push(`/search?${query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 学費スライダー */}
      <Box sx={{ my: 4 }}>
        <Typography id="tuition-slider" sx={{ fontWeight: 600 }} gutterBottom>
          学費（万円）：{tuitionValue}万円
        </Typography>
        <Controller
          name="tuition"
          control={control}
          render={({ field }) => (
            <Slider
              {...field}
              min={0}
              step={1}
              max={200}
              valueLabelDisplay="auto"
              aria-labelledby="tuition-slider"
            />
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
                  value="ネット"
                  control={<Radio />}
                  label="登校なし(ネット)"
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
