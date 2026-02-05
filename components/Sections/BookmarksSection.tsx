"use client";

import { useEffect, useState } from "react";
import { Table } from "../Table";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getBookmarks } from "@/lib/bookmark";
import { useGetBookmarkedSchools } from "@/hooks/useSchools";

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
      <Table
        rows={schools}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
      />
    </>
  );
};
