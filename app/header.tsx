import Link from "next/link";
import React from "react";

const header = () => {
  return (
    <header className=" fixed top-0 w-full max-w-full z-50">
      <nav className="">
        <div className=" block">
          <div className="text-2xl  flex justify-center mt-4">
            新潟県の通信制高校サーチアプリ
          </div>
          <div className=" flex justify-center text-xs mb-4">
            〜あなたに合う高校が見つかる〜
          </div>
          <div
            className=" text-white flex space-x-16 md:space-x-28 justify-center bg-gray-500 p-2 mx-3
          "
          >
            <button className=" border-x-2 border-red-500">
              <Link href="/" className=" mx-2">
                HOME
              </Link>
            </button>
            <button className=" border-x-2 border-blue-300">
              <Link href="/menu/correspondence" className=" mx-2">
                通信制高校とは
              </Link>
            </button>
            <button className=" border-x-2 border-green-500">
              <Link href="/menu/support" className=" mx-2">
                サポート校とは
              </Link>
            </button>
            <button className=" border-x-2">
              <Link href="/menu/school" className=" mx-2">
                学校一覧
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default header;
