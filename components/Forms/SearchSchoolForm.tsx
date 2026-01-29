import React from "react";
import { z } from "zod";
import { ToggleBt } from "../Buttons/ToggleButton";
import { Partition } from "../Partition";
import { FormCheckBox } from "../Base/FormCheckBox";
import { FormSlider } from "../Base/FormSlider";
import { BaseForm } from "../Base/BaseForm";
import { SearchSchoolSchema } from "@/lib/validation/SearchSchoolSchema";

import {
  targetOptions,
  styleOptions,
  attendanceOptions,
} from "@/entities/form";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ComputerIcon from "@mui/icons-material/Computer";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import { UseFormReturn } from "react-hook-form";
import { SearchSchoolFormValues } from "@/entities/form";

interface Props {
  onClose: () => void;
  methodsRef: React.MutableRefObject<UseFormReturn<
    z.infer<typeof SearchSchoolSchema>
  > | null>;
  alignment: string;
  setAlignment: React.Dispatch<React.SetStateAction<string>>;
  defaultValues: SearchSchoolFormValues;
}

export const SearchSchoolForm: React.FC<Props> = ({
  onClose,
  methodsRef,
  alignment,
  setAlignment,
  defaultValues,
}) => {
  return (
    <>
      <BaseForm
        schema={SearchSchoolSchema}
        onSubmit={() => onClose()}
        defaultValues={defaultValues}
        methodsRef={methodsRef}
      >
        <ToggleBt alignment={alignment} setAlignment={setAlignment} />

        <FormCheckBox
          text="対象"
          Icon={CalendarMonthIcon}
          name="target"
          option={targetOptions}
        />

        <Partition width="90%" />

        <FormCheckBox
          text="スタイル"
          Icon={ComputerIcon}
          name="style"
          option={styleOptions}
        />

        <Partition width="90%" />

        <FormCheckBox
          text="通学頻度"
          Icon={DirectionsWalkIcon}
          name="attendance"
          option={attendanceOptions}
        />

        <Partition width="90%" />

        <FormSlider
          text="予算"
          Icon={CurrencyYenIcon}
          name="totalFee"
          min={0}
          step={100000}
          max={4000000}
        />
      </BaseForm>
    </>
  );
};
