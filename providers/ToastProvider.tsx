"use client";

import React from "react";
import { useToast } from "@/hooks/useToast";
import { ToastContext } from "@/context/ToastContext";

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showToast, Toast } = useToast();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {Toast}
    </ToastContext.Provider>
  );
}
