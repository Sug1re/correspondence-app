"use client";

import * as React from "react";
import { useTheme, useMediaQuery } from "@mui/material";

type XsOnlyProps = {
  when: boolean;
  children: React.ReactNode;
};

export function XsWrapper({ when, children }: XsOnlyProps) {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  /**
   * when と xs の関係
   * when === true  && xs === true  → 表示
   * when === false && xs === false → 表示
   * それ以外 → 非表示
   */
  const shouldRender = when ? xs : !xs;

  if (!shouldRender) return null;

  return <>{children}</>;
}
