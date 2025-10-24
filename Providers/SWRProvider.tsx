"use client";

import { SWRConfig } from "swr";
import type { ReactNode } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SWRProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 2000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
