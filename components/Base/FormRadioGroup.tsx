"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  CardContent,
  Typography,
} from "@mui/material";

interface Props {
  name: string;
  text: string;
  option: readonly string[];
  Icon?: React.ElementType;
  disabledOptions?: string[];
}

export const FormRadioGroup = ({
  name,
  text,
  option,
  Icon,
  disabledOptions = [],
}: Props) => {
  const { control } = useFormContext();

  return (
    <CardContent
      sx={{
        px: 6,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography sx={{ fontWeight: 600, display: "flex", gap: 1 }}>
        {Icon && <Icon style={{ color: "#000000" }} />}
        {text}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <FormControl component="fieldset" error={!!fieldState.error}>
            <RadioGroup
              {...field}
              row
              onChange={(e) => field.onChange(e.target.value)}
              value={field.value || ""}
            >
              {option.map((opt) => (
                <FormControlLabel
                  key={opt}
                  value={opt}
                  label={opt}
                  control={
                    <Radio
                      disableRipple
                      TouchRippleProps={{ style: { display: "none" } }}
                      disabled={disabledOptions.includes(opt)}
                      sx={{
                        color: "#003399",
                        "&.Mui-checked": {
                          color: "#003399",
                        },
                        "& .MuiTouchRipple-root": {
                          display: "none",
                        },
                      }}
                    />
                  }
                />
              ))}
            </RadioGroup>
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </CardContent>
  );
};
