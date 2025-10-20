"use client";

import React from "react";
import * as Component from "@/components/index";
import { SchoolCard } from "@/components/Cards/SchoolCard";
import SearchBar from "@/components/Bars/SearchBar";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <SearchBar />

      <SchoolCard />

      <Component.ScrollTopButton />
    </>
  );
}
