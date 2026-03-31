"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

interface Props {
  name: string;
  text: string;
  option: readonly string[];
  Icon?: React.ElementType;
}

export const FormRadioGroup = ({ name, text, option, Icon }: Props) => {
  const { control } = useFormContext();

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
          alignSelf: "stretch",
          "&::after": partition,
        }}
      />

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <FormControl
            component="fieldset"
            error={!!fieldState.error}
            sx={{
              flex: 2,
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#060666ff",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  border: `1px solid #060666ff`,
                },
                "&.Mui-focused fieldset": {
                  border: `1px solid #060666ff`,
                },
              },
              "& .MuiSelect-icon": {
                color: "#060666ff",
              },
            }}
          >
            <RadioGroup row value={field.value ?? ""} onChange={field.onChange}>
              {option.map((opt) => (
                <FormControlLabel
                  key={opt}
                  sx={{
                    width: 80,
                  }}
                  control={
                    <Radio
                      disableRipple
                      TouchRippleProps={{ style: { display: "none" } }}
                      sx={{
                        color: "#060666ff",
                        "&.Mui-checked": {
                          color: "#060666ff",
                        },
                        "& .MuiTouchRipple-root": {
                          display: "none",
                        },
                      }}
                    />
                  }
                  label={opt}
                  value={opt}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      />
    </CardContent>
  );
};
