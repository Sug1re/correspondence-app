"use client";

import React, { useEffect, useState } from "react";
import { SchoolCardSection } from "@/components/Sections/SchoolCardSection";
import { useGetBookmarkedSchools } from "@/hooks/useSchools";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getBookmarks } from "@/lib/bookmark";

export const BookmarksSection = () => {
  const [schoolIds, setSchoolIds] = useState<string[]>([]);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const ids = await getBookmarks();
          setSchoolIds(ids);
        } catch {
          setSchoolIds([]);
        }
      } else {
        setSchoolIds([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const {
    schools = [],
    isLoading,
    isError,
    isEmpty,
  } = useGetBookmarkedSchools(schoolIds);

  return (
    <>
      <SchoolCardSection
        school={schools}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
      />
    </>
  );
};
