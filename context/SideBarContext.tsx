"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SideBarContextType = {
  selected: string;
  setSelected: (id: string) => void;
};

const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

export const SideBarProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState("home");
  return (
    <SideBarContext.Provider value={{ selected, setSelected }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBar = () => {
  const context = useContext(SideBarContext);
  if (!context)
    throw new Error("useSideBar must be used within SideBarProvider");
  return context;
};
