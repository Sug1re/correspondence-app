"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Typography, Slider, Button } from "@mui/material";
import { useRouter } from "next/navigation";

type FormValues = {
  tuition: number;
};

export default function TuitionSlider() {
  const { control, handleSubmit, getValues, watch } = useForm<FormValues>({
    defaultValues: {
      tuition: 10,
    },
  });

  const router = useRouter();

  const tuitionValue = watch("tuition");

  const onSubmit = () => {
    const value = getValues("tuition");
    router.push(`/search?tuition=${value}`); // /search　ページに遷移
  };

  return (
    <Box>
      <Typography id="non-linear-slider" gutterBottom>
        学費（万円）:{tuitionValue}万円
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
            aria-labelledby="non-linear-slider"
          />
        )}
      />
      <Button
        variant="contained"
        onClick={handleSubmit(onSubmit)} // onSubmit を実行
        sx={{ mt: 2 }}
      >
        現在の値を取得
      </Button>
    </Box>
  );
}
