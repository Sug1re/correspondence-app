"use client";
import { CourseCardSection } from "@/components/Sections/CourseCardSection";
import { useGetAdmissionType } from "@/hooks/useSchools";
import { FilterSection } from "./FilterSection";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  admissionType?: "admission" | "transfer";
};

export const DefaultSection = ({ admissionType }: Props) => {
  const [isSort, { toggle: toggleSort }] = useDisclosure(false);

  const {
    courses = [],
    isLoading,
    isError,
    isEmpty,
  } = useGetAdmissionType(admissionType);

  return (
    <>
      <FilterSection
        isSort={isSort}
        toggleSort={toggleSort}
        showSetting={admissionType !== "admission"}
      />

      <CourseCardSection
        course={courses}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
        isSort={isSort}
      />
    </>
  );
};
