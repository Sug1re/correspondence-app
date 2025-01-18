"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Slider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

// React Hook Form の設定
type FormValues = {
  tuition: number;
};

const Form = () => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      tuition: 10, // 初期値設定
    },
  });

  const tuitionValue = watch("tuition");

  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    // フォームの値を取得
    const { tuition } = data;

    // クエリパラメータを生成して検索ページへ遷移
    const query = new URLSearchParams({
      tuition: tuition.toString(),
    }).toString();

    router.push(`/search?${query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 学費スライダー */}
      <Box sx={{ my: 4 }}>
        <Typography id="tuition-slider" gutterBottom>
          学費（万円）：{tuitionValue}万円
        </Typography>
        <Controller
          name="tuition"
          control={control}
          render={({ field }) => (
            <Slider
              {...field}
              min={1}
              step={1}
              max={200}
              valueLabelDisplay="auto"
              aria-labelledby="tuition-slider"
            />
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
