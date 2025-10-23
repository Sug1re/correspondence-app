import React from "react";
import { z } from "zod";
import { BaseForm } from "@/components/Base/BaseForm";
import { FormSelect } from "../Base/FormSelect";
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
  targetEntranceOptions,
  targetOptions,
  targetTransferOptions,
} from "@/entities/form";

import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import SchoolIcon from "@mui/icons-material/School";
import ComputerIcon from "@mui/icons-material/Computer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BusinessIcon from "@mui/icons-material/Business";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

interface Props {
  onClose: () => void;
  methodsRef: React.MutableRefObject<UseFormReturn<
    z.infer<typeof SearchSchoolSchema>
  > | null>;
  target?: "entrance" | "transfer";
}

export const SearchSchoolForm: React.FC<Props> = ({
  onClose,
  methodsRef,
  target,
}) => {
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
      <FormContent target={target} />
    </BaseForm>
  );
};

const FormContent = ({ target }: { target?: "entrance" | "transfer" }) => {
  const { disabledOptions } = useSearchSchoolForm();

  const options =
    target === "entrance"
      ? targetEntranceOptions
      : target === "transfer"
      ? targetTransferOptions
      : targetOptions;

  return (
    <>
      <FormSelect
        text="入学時期"
        Icon={CalendarMonthIcon}
        name="target"
        option={options}
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

      <FormRadioGroup
        text="スクーリング会場"
        Icon={SchoolIcon}
        name="schooling"
        option={schoolingOptions}
      />
    </>
  );
};
