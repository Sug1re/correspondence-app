import { useDidUpdate } from "@mantine/hooks";
import { useFormContext } from "react-hook-form";

export function useFormSynchro() {
  const { watch, setValue } = useFormContext();

  const commutingStyleValue = watch("commutingStyle");
  const attendanceFrequencyValue = watch("attendanceFrequency") || [];

  // ---- commutingStyle → attendanceFrequency の同期 ----
  useDidUpdate(() => {
    if (commutingStyleValue === "オンライン") {
      setValue("attendanceFrequency", ["オンライン"]);
    } else if (commutingStyleValue === "通学") {
      if (attendanceFrequencyValue.includes("オンライン")) {
        setValue(
          "attendanceFrequency",
          attendanceFrequencyValue.filter((v: string) => v !== "オンライン")
        );
      }
    }
  }, [commutingStyleValue]);

  // ---- attendanceFrequency → commutingStyle の同期 ----
  useDidUpdate(() => {
    if (attendanceFrequencyValue.includes("オンライン")) {
      if (commutingStyleValue !== "オンライン") {
        setValue("commutingStyle", "オンライン");
      }
    } else {
      if (commutingStyleValue === "オンライン") {
        setValue("commutingStyle", "通学");
      }
    }
  }, [attendanceFrequencyValue]);
}
