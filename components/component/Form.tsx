"use client";

import React from "react";
import { Box, Button, Input, Slider, Typography } from "@mui/material";
import * as Component from "@/components/component";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// React Hook Form の設定
type FormValues = {
  tuition: number;
};

const Form = () => {
  const { control, handleSubmit, getValues } = useForm<FormValues>({
    defaultValues: {
      tuition: 10,
    },
  });

  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    // フォームの値を取得
    const { tuition } = data;

    // クエリパラメータを生成して /search ページへ遷移
    const query = new URLSearchParams({
      tuition: tuition.toString(),
    }).toString();

    router.push(`/search?${query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*学費*/}
      <Box sx={{ my: 4 }}>
        <Component.TuitionSlider />
      </Box>
      {/*検索ボタン*/}
      <Box sx={{ my: 3 }}>
        <Button variant="contained" type="submit">
          検索
        </Button>
      </Box>
    </form>
  );
};

export default Form;
