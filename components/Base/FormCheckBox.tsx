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
} from "@mui/material";

interface Props {
  name: string;
  text: string;
  option: readonly string[];
  Icon?: React.ElementType;
  disabledOptions?: string[];
}

export const FormCheckBox = ({
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
        defaultValue={[]} // ← Checkbox用に配列で初期化
        render={({ field, fieldState }) => (
          <FormControl component="fieldset" error={!!fieldState.error}>
            <FormGroup row>
              {option.map((opt) => {
                const checked = field.value?.includes(opt) || false;
                return (
                  <FormControlLabel
                    key={opt}
                    control={
                      <Checkbox
                        disableRipple
                        checked={checked}
                        disabled={disabledOptions.includes(opt)}
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
                          color: "#003399",
                          "&.Mui-checked": {
                            color: "#003399",
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
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </CardContent>
  );
};

// "use client";

// import React from "react";
// import { useFormContext, Controller } from "react-hook-form";
// import {
//   FormControlLabel,
//   Checkbox,
//   FormHelperText,
//   Typography,
//   CardContent,
// } from "@mui/material";

// interface Props {
//   name: string;
//   text: string;
//   option: readonly string[];
//   Icon?: React.ElementType;
//   disabledOptions?: string[];
// }

// export const FormCheckbox = ({
//   name,
//   text,
//   option,
//   Icon,
//   disabledOptions = [],
// }: Props) => {
//   const { control, getValues, setValue } = useFormContext();

//   const handleChange = (value: string, checked: boolean) => {
//     const currentValues: string[] = getValues(name) || [];
//     if (checked) {
//       setValue(name, [...currentValues, value]);
//     } else {
//       setValue(
//         name,
//         currentValues.filter((v) => v !== value)
//       );
//     }
//   };
//   return (
//     <CardContent
//       sx={{
//         px: 6,
//         width: "100%",
//         boxSizing: "border-box",
//       }}
//     >
//       <Typography sx={{ fontWeight: 600, display: "flex", gap: 1 }}>
//         {Icon && <Icon style={{ color: "#000000" }} />}
//         {text}
//       </Typography>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field, fieldState }) => {
//           const selectedValues: string[] = field.value || [];

//           return (
//             <>
//               {option.map((opt) => (
//                 <FormControlLabel
//                   key={opt}
//                   control={
//                     <Checkbox
//                       checked={selectedValues.includes(opt)}
//                       onChange={(e) => handleChange(opt, e.target.checked)}
//                       disabled={disabledOptions.includes(opt)}
//                       disableRipple
//                       sx={{
//                         color: "#003399",
//                         "&.Mui-checked": {
//                           color: "#003399",
//                         },
//                       }}
//                     />
//                   }
//                   label={opt}
//                 />
//               ))}
//               {fieldState.error && (
//                 <FormHelperText error>
//                   {fieldState.error.message}
//                 </FormHelperText>
//               )}
//             </>
//           );
//         }}
//       />
//     </CardContent>
//   );
// };
