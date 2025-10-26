import React from "react";
import { z } from "zod";
import { BaseForm } from "@/components/Base/BaseForm";
import { FormRadioGroup } from "../Base/FormRadioGroup";
import { FormSlider } from "../Base/FormSlider";
import { SearchSchoolSchema } from "@/lib/validation/SearchSchoolSchema";
import { UseFormReturn } from "react-hook-form";
import { useSearchSchoolForm } from "@/hooks/useSearchSchoolForm";
import {
  attendanceOptions,
  schoolingOptions,
  schoolOptions,
  SearchSchoolDefaultValues,
  styleOptions,
  targetOptions,
} from "@/entities/form";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import SchoolIcon from "@mui/icons-material/School";
import ComputerIcon from "@mui/icons-material/Computer";
import BusinessIcon from "@mui/icons-material/Business";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { FormCheckBox } from "../Base/FormCheckBox";

interface Props {
  onClose: () => void;
  methodsRef: React.MutableRefObject<UseFormReturn<
    z.infer<typeof SearchSchoolSchema>
  > | null>;
}

export const SearchSchoolForm: React.FC<Props> = ({ onClose, methodsRef }) => {
  const onSubmit = (data: z.infer<typeof SearchSchoolSchema>) => {
    console.log("Form Data:", data);
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
  const { disabledOptions } = useSearchSchoolForm();

  return (
    <>
      <FormRadioGroup
        text="対象"
        Icon={CalendarMonthIcon}
        name="target"
        option={targetOptions}
      />

      <FormSlider
        text="3年間の学費総額"
        Icon={CurrencyYenIcon}
        name="totalFee"
        min={0}
        step={100000}
        max={4000000}
      />

      <FormRadioGroup
        text="学校情報1"
        Icon={BusinessIcon}
        name="school"
        option={schoolOptions}
      />

      <FormRadioGroup
        text="学校情報2"
        Icon={ComputerIcon}
        name="style"
        option={styleOptions}
      />

      <FormRadioGroup
        text="登校頻度"
        Icon={DirectionsWalkIcon}
        name="attendance"
        option={attendanceOptions}
        disabledOptions={disabledOptions}
      />

      <FormCheckBox
        text="スクーリング会場"
        Icon={SchoolIcon}
        name="schooling"
        option={schoolingOptions}
      />
    </>
  );
};
