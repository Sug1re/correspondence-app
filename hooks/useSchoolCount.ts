"use client";

import { useState } from "react";
import { useDidUpdate } from "@mantine/hooks";
import { School } from "@/entities/school";

export const useSchoolCount = (schools: School[] | undefined) => {
  const [count, setCount] = useState<number>(schools?.length ?? 0);

  useDidUpdate(() => {
    setCount(schools?.length ?? 0);
  }, [schools]);

  return count;
};
