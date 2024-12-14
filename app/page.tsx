import React from "react";
import Link from "next/link";
import Header from "./header";

export default function Home() {
  return (
    <main>
      <section>
        <Header />
      </section>
      <section className=" px-4 mb-8">
        <h1>当サイトの説明</h1>
        {/* 説明を考える*/}
        <p>
          簡単なアンケートに答えるだけで自分に合った高校が候補別でわかります。
        </p>
      </section>
      <section className=" flex justify-center px-4">
        <button className=" bg-blue-500 px-5 py-4 text-white rounded w-1/2 hover:scale-105 hover:bg-blue-400 duration-200">
          <Link href="/questionnaire">高校を見つける</Link>
        </button>
      </section>
    </main>
  );
}
