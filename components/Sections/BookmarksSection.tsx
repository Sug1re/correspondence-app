"use client";

import React, { useEffect, useState } from "react";
import { CourseCardSection } from "@/components/Sections/CourseCardSection";
import { useGetBookmarkedCourses } from "@/hooks/useSchools";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getBookmarks } from "@/lib/bookmark";

export const BookmarksSection = () => {
  const [courseIds, setCourseIds] = useState<string[]>([]);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const ids = await getBookmarks();
          setCourseIds(ids);
        } catch {
          setCourseIds([]);
        }
      } else {
        setCourseIds([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const {
    courses = [],
    isLoading,
    isError,
    isEmpty,
  } = useGetBookmarkedCourses(courseIds);

  return (
    <>
      <CourseCardSection
        course={courses}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
      />
    </>
  );
};
