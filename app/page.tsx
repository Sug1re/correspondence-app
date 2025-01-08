import React from "react";
import Link from "next/link";
import Header from "./header";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <main className=" min-h-screen bg-gray-100 pt-40">
      <section>
        <Header />
      </section>
      <section className=" px-2 mb-8">
        <h1 className="text-lg">当サイトの説明</h1>
        {/* 説明を考える*/}
        <p>
          簡単なアンケートに答えるだけで
          {/* <br />で改行*/}
          <br />
          自分に合った高校が候補別でわかります。
        </p>
      </section>
      <section className=" flex flex-col items-center justify-center px-4">
        {/* <Button className=" bg-blue-500 px-5 py-4 text-white font-bold rounded w-2/3 hover:scale-105 hover:bg-blue-600 duration-200">
          <Link href="/Questionnaire" className=" whitespace-nowrap">
            高校を見つける
          </Link>
        </Button> */}
        <Button
          variant="contained"
          className=" bg-blue-500 px-5 py-4 text-white font-bold rounded w-2/3 hover:scale-105 hover:bg-blue-600 duration-200"
        >
          <Link href="/SchoolRecommendation" className=" whitespace-nowrap">
            高校を見つける
          </Link>
        </Button>
      </section>
    </main>
  );
}
