"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormHelperText,
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

export const FormCheckBox = ({ name, text, option, Icon }: Props) => {
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
        px: 2,
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
        defaultValue={[]}
        render={({ field, fieldState }) => (
          <FormControl
            component="fieldset"
            error={!!fieldState.error}
            sx={{
              flex: 2,
            }}
          >
            <FormGroup row>
              {option.map((opt) => {
                const checked = field.value?.includes(opt) || false;
                return (
                  <FormControlLabel
                    key={opt}
                    sx={{
                      width: 160,
                    }}
                    control={
                      <Checkbox
                        disableRipple
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, opt]);
                          } else {
                            field.onChange(
                              field.value.filter((item: string) => item !== opt)
                            );
                          }
                        }}
                        sx={{
                          color: "#060666ff",
                          "&.Mui-checked": {
                            color: "#060666ff",
                          },
                        }}
                      />
                    }
                    label={opt}
                    value={opt}
                  />
                );
              })}
            </FormGroup>

            {fieldState.error && (
              <FormHelperText error>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </CardContent>
  );
};
