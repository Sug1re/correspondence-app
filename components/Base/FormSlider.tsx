"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Slider,
  Typography,
  Box,
  FormHelperText,
  CardContent,
} from "@mui/material";

interface Props {
  name: string;
  min: number;
  max: number;
  step?: number;
  marks?: boolean;
  text: string;
  Icon?: React.ElementType;
}

export const FormSlider = ({
  name,
  min,
  max,
  step = 1,
  marks = false,
  text,
  Icon,
}: Props) => {
  const { control, watch } = useFormContext();

  const totalFee = watch("totalFee");

  return (
    <CardContent
      sx={{
        px: 6,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography
        id="totalTuitionFeeSlider"
        sx={{ fontWeight: 600, display: "flex", gap: 1 }}
      >
        {Icon && <Icon style={{ color: "#000000" }} />}
        {text}
      </Typography>
      <Typography
        sx={{
          fontWeight: 600,
          ml: 2,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          height: 32,
        }}
      >
        {Icon && <Icon style={{ color: "#000000" }} />}
        {totalFee[0].toLocaleString("ja-JP")} 〜
        {Icon && <Icon style={{ color: "#000000" }} />}
        {totalFee[1].toLocaleString("ja-JP")}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Box>
            <Slider
              {...field}
              value={field.value ?? [min, max]}
              min={min}
              max={max}
              step={step}
              marks={marks}
              onChange={(_, value) =>
                field.onChange(value as unknown as number[])
              }
              valueLabelDisplay="auto"
              sx={{
                width: "100%",
                color: "#003399",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#003399",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "none",
                  },
                },
                "& .MuiSlider-track": {
                  backgroundColor: "#003399",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#b0c4de",
                },
              }}
            />
            {fieldState.error && (
              <FormHelperText error>{fieldState.error.message}</FormHelperText>
            )}
          </Box>
        )}
      />
    </CardContent>
  );
};
