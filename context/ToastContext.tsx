"use client";

import React, { createContext, useContext } from "react";
import { useToast } from "@/hooks/useToast";

type ToastContextType = {
  showToast: (msg: string, sev?: "success" | "error") => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error("useToastContext must be used within ToastProvider");
  return ctx;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { showToast, Toast } = useToast();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {Toast}
    </ToastContext.Provider>
  );
};
