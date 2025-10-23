import { useDidUpdate } from "@mantine/hooks";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

export function useSearchSchoolForm() {
  const { watch, setValue, getValues } = useFormContext();
  const styleValue = watch("style");
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);

  useDidUpdate(() => {
    const attendanceValue = getValues("attendance") as string | undefined;

    if (styleValue === "オンライン") {
      if (attendanceValue !== "オンライン") {
        setValue("attendance", "オンライン", { shouldValidate: true });
      }
      setDisabledOptions(["週1","週2","週3","週4","週5","自由"]);
    } else if (styleValue === "通学") {
      setDisabledOptions(["オンライン"]);

      if (attendanceValue === "オンライン") {
        setValue("attendance", "", { shouldValidate: true });
      }
    }
  }, [styleValue]);

  return { disabledOptions };
}
