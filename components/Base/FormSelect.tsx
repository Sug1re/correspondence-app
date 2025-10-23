"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  CardContent,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface Props {
  name: string;
  text: string;
  option: readonly string[];
  Icon?: React.ElementType;
}

export const FormSelect = ({ name, text, option, Icon }: Props) => {
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
          <FormControl error={!!fieldState.error} sx={{ mt: 1, width: "50%" }}>
            <InputLabel id={`${name}-label`}>入学時期</InputLabel>
            <Select
              labelId={`${name}-label`}
              value={field.value || ""}
              label="入学時期"
              onChange={(e) => field.onChange(e.target.value)}
            >
              {option.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </CardContent>
  );
};
