import React from "react";
import { z } from "zod";
import { BaseForm } from "@/components/Base/BaseForm";
import { FormSlider } from "../Base/FormSlider";
import { FormCheckBox } from "../Base/FormCheckBox";
import { SearchSchoolSchema } from "@/lib/validation/SearchSchoolSchema";
import { UseFormReturn } from "react-hook-form";
import { Box } from "@mui/material";
import {
  attendanceOptions,
  SearchSchoolDefaultValues,
  styleOptions,
  targetOptions,
} from "@/entities/form";
import { ToggleBt } from "../Buttons/ToggleButton";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ComputerIcon from "@mui/icons-material/Computer";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";

interface Props {
  onClose: () => void;
  methodsRef: React.MutableRefObject<UseFormReturn<
    z.infer<typeof SearchSchoolSchema>
  > | null>;
}

export const SearchSchoolForm: React.FC<Props> = ({ onClose, methodsRef }) => {
  const onSubmit = () => {
    onClose();
  };

  return (
    <BaseForm
      schema={SearchSchoolSchema}
      onSubmit={onSubmit}
      defaultValues={SearchSchoolDefaultValues}
      methodsRef={methodsRef}
    >
      <FormContent />
    </BaseForm>
  );
};

const FormContent = () => {
  const partition = {
    content: '""',
    position: "absolute",
    right: 0,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    height: "1.5px",
    width: "90%",
    backgroundColor: "#adb1b7ff",
  };

  return (
    <>
      <ToggleBt />

      <FormCheckBox
        text="対象"
        Icon={CalendarMonthIcon}
        name="target"
        option={targetOptions}
      />

      <Box
        sx={{
          position: "relative",
          alignSelf: "stretch",
          "&::after": partition,
        }}
      />

      <FormCheckBox
        text="スタイル"
        Icon={ComputerIcon}
        name="style"
        option={styleOptions}
      />

      <Box
        sx={{
          position: "relative",
          alignSelf: "stretch",
          "&::after": partition,
        }}
      />

      <FormCheckBox
        text="通学頻度"
        Icon={DirectionsWalkIcon}
        name="attendance"
        option={attendanceOptions}
      />

      <Box
        sx={{
          position: "relative",
          alignSelf: "stretch",
          "&::after": partition,
        }}
      />

      <FormSlider
        text="予算"
        Icon={CurrencyYenIcon}
        name="totalFee"
        min={0}
        step={100000}
        max={4000000}
      />
    </>
  );
};
