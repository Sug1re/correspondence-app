"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Typography,
  CardContent,
} from "@mui/material";

interface Props {
  name: string;
  text: string;
  option: readonly string[];
  Icon?: React.ElementType;
  disabledOptions?: string[];
}

export const FormCheckbox = ({
  name,
  text,
  option,
  Icon,
  disabledOptions = [],
}: Props) => {
  const { control, getValues, setValue } = useFormContext();

  const handleChange = (value: string, checked: boolean) => {
    const currentValues: string[] = getValues(name) || [];
    if (checked) {
      setValue(name, [...currentValues, value]);
    } else {
      setValue(
        name,
        currentValues.filter((v) => v !== value)
      );
    }
  };
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
        render={({ field, fieldState }) => {
          const selectedValues: string[] = field.value || [];

          return (
            <>
              {option.map((opt) => (
                <FormControlLabel
                  key={opt}
                  control={
                    <Checkbox
                      checked={selectedValues.includes(opt)}
                      onChange={(e) => handleChange(opt, e.target.checked)}
                      disabled={disabledOptions.includes(opt)}
                      disableRipple
                      sx={{
                        color: "#003399",
                        "&.Mui-checked": {
                          color: "#003399",
                        },
                      }}
                    />
                  }
                  label={opt}
                />
              ))}
              {fieldState.error && (
                <FormHelperText error>
                  {fieldState.error.message}
                </FormHelperText>
              )}
            </>
          );
        }}
      />
    </CardContent>
  );
};
