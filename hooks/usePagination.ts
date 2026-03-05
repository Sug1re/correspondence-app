import { useState, useMemo, useEffect } from "react";
import { useResponsive } from "./useResponsive";

export const usePagination = <T,>(items: T[]) => {
  const { itemsPerPage } = useResponsive();

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const partSchools = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, page, itemsPerPage]);

  useEffect(() => {
    setPage(1);
  }, [items,itemsPerPage]);

  return {
    page,
    setPage,
    totalPages,
    partSchools,
  };
};
