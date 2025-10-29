"use client";

import React, { useEffect, useState } from "react";
import { SchoolCardSection } from "@/components/Sections/SchoolCardSection";
import { useGetBookmarkedSchools } from "@/hooks/useSchools";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getBookmarks } from "@/lib/bookmark";

export const BookmarksSection = () => {
  const [schoolIds, setSchoolIds] = useState<string[]>([]);
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const ids = await getBookmarks();
          console.log("ブックマーク一覧:", ids);
          setSchoolIds(ids); // state に保存
        } catch (error) {
          console.error("ブックマーク取得エラー:", error);
        }
      } else {
        setSchoolIds([]); // 未ログイン時は空
        console.log("未ログイン状態です");
      }
    });

    return () => unsubscribe();
  }, []);

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

// ログアウト時にidsがtrueのままになってしまう
