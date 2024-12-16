import Link from "next/link";
import React from "react";

const header = () => {
  return (
    <header className=" fixed top-0 w-full">
      <h1 className=" text-xl md:text-3xl flex justify-center mt-4">
        新潟県の通信制高校サーチアプリ
      </h1>
      <p className=" text-xs md:text-lg flex justify-center mb-4">
        〜あなたに合う高校が見つかる〜
      </p>
      <nav className=" font-black text-white whitespace-nowrap grid grid-cols-4 gap-1 md:gap-8 bg-gray-500 py-2 px-2 md:px-8 md:mx-3">
        <button className=" text-2xs md:text-base border-x md:border-x-4 border-red-500 hover:bg-gray-400">
          <Link href="/" className=" md:mx-2">
            HOME
          </Link>
        </button>
        <button className=" text-2xs md:text-base border-x md:border-x-4 border-blue-300 hover:bg-gray-400">
          <Link href="/menu/correspondence" className=" md:mx-2">
            通信制高校とは
          </Link>
        </button>
        <button className=" text-2xs md:text-base border-x md:border-x-4 border-green-500 hover:bg-gray-400">
          <Link href="/menu/support" className=" md:mx-2">
            サポート校とは
          </Link>
        </button>
        <button className=" text-2xs md:text-base border-x md:border-x-4 hover:bg-gray-400">
          <Link href="/menu/school" className="md:mx-2">
            学校一覧
          </Link>
        </button>
      </nav>
    </header>
  );
};

export default header;
