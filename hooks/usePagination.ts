import { useState, useMemo } from "react";
import { ITEMS_PER_PAGE } from "@/lib/constants";

export const usePagination = <T,>(items: T[]) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const partSchools = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return items.slice(startIndex, endIndex);
  }, [items, page]);

  return {
    page,
    setPage,
    totalPages,
    partSchools,
  };
};
