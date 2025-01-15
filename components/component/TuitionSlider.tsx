// "use client";

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Slider from "@mui/material/Slider";

// export default function NonLinearSlider() {
//   const [value, setValue] = React.useState<number>(10);

//   const handleChange = (event: Event, newValue: number | number[]) => {
//     if (typeof newValue === "number") {
//       setValue(newValue);
//     }
//   };

//   return (
//     <Box>
//       <Typography id="non-linear-slider" gutterBottom>
//         学費（万円）: {value}万円
//       </Typography>
//       <Slider
//         value={value}
//         min={1}
//         step={1}
//         max={100}
//         onChange={handleChange}
//         valueLabelDisplay="auto"
//         aria-labelledby="non-linear-slider"
//       />
//     </Box>
//   );
// }

"use client";

import React from "react";
import { Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

interface TuitionSliderProps {
  control: any; // React Hook Formのコントロールオブジェクト
  name: string; // フォームでのスライダーの名前
  errors: any; // React Hook Formでのエラーオブジェクト
}

export default function TuitionSlider({
  control,
  name,
  errors,
}: TuitionSliderProps) {
  return (
    <Box>
      <Typography id="tuition-slider" gutterBottom>
        学費（万円）
      </Typography>
      <Controller
        name={name}
        control={control}
        rules={{
          required: "学費を選択してください。",
          validate: (value) => value > 0 || "学費を選択してください。",
        }}
        render={({ field }) => (
          <>
            <Slider
              {...field}
              value={field.value || 0} // 初期値を設定
              onChange={(_, value) => field.onChange(value)} // Slider用のonChangeを適応
              min={1}
              step={1}
              max={100}
              valueLabelDisplay="auto"
              aria-labelledby="tuition-slider"
            />
            {errors[name] && (
              <Typography color="error">{errors[name].message}</Typography>
            )}
          </>
        )}
      />
    </Box>
  );
}
