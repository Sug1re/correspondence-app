"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { SettingFormValues } from "@/entities/form";

type SettingContextType = {
  settings: SettingFormValues;
  setSettings: (data: SettingFormValues) => void;
};

const defaultSettings: SettingFormValues = {
  admissionSeason: "4月",
};

const SettingContext = createContext<SettingContextType | undefined>(undefined);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SettingFormValues>(defaultSettings);

  return (
    <SettingContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingContext.Provider>
  );
};

export const useSetting = () => {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useSetting must be used within SettingProvider");
  }
  return context;
};
