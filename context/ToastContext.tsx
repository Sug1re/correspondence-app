"use client";

import { createContext, useContext } from "react";

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
