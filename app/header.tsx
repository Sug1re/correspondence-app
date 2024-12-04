import React from "react";

const header = () => {
  return (
    <header className=" fixed top-0 w-full  bg-gray-900 p-2 max-w-full z-50">
      <nav className="flex justify-between items-center">
        <div className=" block">
          <div className="text-lg text-white">
            新潟県の通信制高校サーチアプリ
          </div>
          <div className="text-white flex">
            <div>通信制高校とは</div>
            <div>サポート校とは</div>
            <div>おはよう</div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default header;
