"use client";

import React from "react";
import { SchoolCard } from "@/components/Cards/SchoolCard";
import SearchBar from "@/components/Bars/SearchBar";
import Header from "@/components/Header";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";

export default function Home() {
  return (
    <>
      <Header />

      <SearchBar />

      <SchoolCard />

      <ScrollToTopButton />
    </>
  );
}
