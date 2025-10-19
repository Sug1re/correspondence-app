import { useDidUpdate, useListState } from "@mantine/hooks";
import { useFormContext } from "react-hook-form";

export function useSearchSchoolForm() {
  const { watch, setValue, getValues } = useFormContext();
  const styleValue = watch("style");
  const [disabledOptions, disabledOptionsHandlers] = useListState<string>([]);

  useDidUpdate(() => {
    const attendanceValues = getValues("attendance") || [];

    if (styleValue === "オンライン") {
      if (!attendanceValues.includes("オンライン")) {
        setValue("attendance", ["オンライン"], { shouldValidate: true });
      }
      disabledOptionsHandlers.setState(["週1","週2","週3","週4","週5","自由"]);
    } else if (styleValue === "通学") {
      disabledOptionsHandlers.setState(["オンライン"]);

      if (attendanceValues.includes("オンライン")) {
        const newValues = (attendanceValues as string[]).filter(
          (v: string) => v !== "オンライン"
        );
        setValue("attendance", newValues, { shouldValidate: true });
      }
    }
  }, [styleValue]);

return { disabledOptions };
}
