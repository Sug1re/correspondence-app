"use client";

import { useEffect, useState } from "react";
import { Table } from "../Table";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getBookmarks } from "@/lib/bookmark";
import { useGetBookmarkedCourses } from "@/hooks/useSchools";

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
      <Table
        rows={courses}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
      />
    </>
  );
};
