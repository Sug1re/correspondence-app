"use client";

import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export const ToggleBt = () => {
  const [alignment, setAlignment] = useState("OR");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const ToggleButtonStyle = {
    width: 100,
    height: 30,
    color: "#060666ff",
    border: "1px solid #060666ff",
    "&.Mui-selected": {
      bgcolor: "#060666ff",
      color: "#fff",
    },
    "&.Mui-selected:hover": {
      bgcolor: "#060666ff",
      color: "#fff",
    },
    "&:hover": {
      bgcolor: "#ffffff",
    },
  };

  return (
    <>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleChange}
        sx={{ display: "flex", justifyContent: "center", mt: 2 }}
      >
        <ToggleButton
          value="OR"
          sx={{
            ...ToggleButtonStyle,
          }}
          disableRipple
        >
          OR
        </ToggleButton>

        <ToggleButton
          value="AND"
          sx={{
            ...ToggleButtonStyle,
          }}
          disableRipple
        >
          AND
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};
