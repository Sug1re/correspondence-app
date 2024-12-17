import React from "react";
import Header from "@/app/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 学校紹介ページ
const school = () => {
  return (
    <main className="pt-40">
      <section>
        <Header />
      </section>
      <section>
        <h1 className=" font-black bg-gray-300 rounded p-2 mb-2">
          通信制高校一覧
        </h1>
        <Card className=" mx-4 md:mx-32">
          <CardHeader>
            <CardTitle>学校名</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default school;
