import React from "react";
import { z } from "zod";
import { BaseForm } from "@/components/Base/BaseForm";
import { FormCheckbox } from "../Base/FormCheckBox";
import { FormRadioGroup } from "../Base/FormRadioGroup";
import { FormSlider } from "../Base/FormSlider";
import { TestSchema } from "@/lib/validation/TestSchema";
import { UseFormReturn } from "react-hook-form";
import {
  attendanceOptions,
  schoolingOptions,
  schoolOptions,
  SearchSchoolDefaultValues,
  styleOptions,
} from "@/entities/form";

import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import SchoolIcon from "@mui/icons-material/School";
import ComputerIcon from "@mui/icons-material/Computer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BusinessIcon from "@mui/icons-material/Business";
import { useSearchSchoolForm } from "@/hooks/useSearchSchoolForm";

interface Props {
  onClose: () => void;
  methodsRef: React.MutableRefObject<UseFormReturn<
    z.infer<typeof TestSchema>
  > | null>;
}

export const TestForm: React.FC<Props> = ({ onClose, methodsRef }) => {
  const onSubmit = (data: z.infer<typeof TestSchema>) => {
    console.log("Form Data:", data);
    onClose();
  };

  return (
    <BaseForm
      schema={TestSchema}
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

      <FormCheckbox
        text="登校頻度"
        Icon={CalendarMonthIcon}
        name="attendance"
        option={attendanceOptions}
        disabledOptions={disabledOptions}
      />

      <FormRadioGroup
        text="スクーリング会場"
        Icon={SchoolIcon}
        name="schooling"
        option={schoolingOptions}
      />
    </>
  );
};
