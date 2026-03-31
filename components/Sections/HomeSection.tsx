"use client";
import { CourseCardSection } from "@/components/Sections/CourseCardSection";
import { useGetCourses } from "@/hooks/useSchools";
import { FilterSection } from "./FilterSection";
import { useDisclosure } from "@mantine/hooks";

export const HomeSection = () => {
  const [isSort, { toggle: toggleSort }] = useDisclosure(false);

  const { courses = [], isLoading, isError, isEmpty } = useGetCourses();

  return (
    <>
      <FilterSection isSort={isSort} toggleSort={toggleSort} />

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
