import { FormRadioGroup } from "../Base/FormRadioGroup";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { admissionSeasonOptions, SettingFormValues } from "@/entities/form";
import { BaseForm } from "../Base/BaseForm";
import { SettingSchema } from "@/lib/validation/Schema";
import z from "zod";
import { UseFormReturn } from "react-hook-form";

interface Props {
  onClose: () => void;
  methodsRef: React.MutableRefObject<UseFormReturn<
    z.infer<typeof SettingSchema>
  > | null>;
  defaultValues: SettingFormValues;
}

export const SettingForm = ({ onClose, methodsRef, defaultValues }: Props) => {
  return (
    <BaseForm
      schema={SettingSchema}
      onSubmit={() => onClose()}
      defaultValues={defaultValues}
      methodsRef={methodsRef}
    >
      <FormRadioGroup
        name="admissionSeason"
        text="入学時期"
        option={admissionSeasonOptions}
        Icon={WorkOutlineIcon}
      />
    </BaseForm>
  );
};
