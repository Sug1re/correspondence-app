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

  const partition = {
    content: '""',
    position: "absolute",
    right: 0,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    height: "100%",
    width: "2px",
    backgroundColor: "#b0c4de",
  };

  const totalFee = watch("totalFee");

  return (
    <CardContent
      sx={{
        display: "flex",
        gap: 1.5,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography
        id="totalTuitionFeeSlider"
        sx={{
          fontWeight: 600,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          gap: 1,
          flex: 1,
        }}
      >
        {Icon && <Icon style={{ color: "#000000" }} />}
        {text}
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "2px",
          alignSelf: "stretch",
          "&::after": partition,
        }}
      />

      <Box sx={{ flex: 2 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 14,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 32,
          }}
        >
          {Icon && <Icon style={{ fontSize: 16, color: "#000000" }} />}
          {totalFee[0].toLocaleString("ja-JP")} 〜
          {Icon && <Icon style={{ fontSize: 16, color: "#000000" }} />}
          {totalFee[1].toLocaleString("ja-JP")}
        </Typography>

        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
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
                  width: "90%",
                  margin: "0 auto",
                  color: "#060666ff",

                  "& .MuiSlider-thumb": {
                    backgroundColor: "#060666ff",
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: "none",
                    },
                  },

                  "& .MuiSlider-track": {
                    backgroundColor: "#060666ff",
                  },

                  "& .MuiSlider-rail": {
                    backgroundColor: "#b0c4de",
                  },
                }}
              />

              {fieldState.error && (
                <FormHelperText error>
                  {fieldState.error.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />
      </Box>
    </CardContent>
  );
};
