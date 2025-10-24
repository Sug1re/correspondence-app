"use client";

import { MantineProvider as Provider } from "@mantine/core";
import type { ReactNode } from "react";

export default function MantineProvider({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}
