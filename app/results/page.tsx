import Header from "@/app/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

// アンケート回答後の結果がわかるページ
const Results = () => {
  return (
    <main className=" py-40 bg-gray-100">
      <section>
        <Header />
      </section>
      <section className=" mx-4 pb-4">
        <div className=" space-y-4">
          <div>
            <p className=" m-1 font-bold">自分とのマッチ度％の学校</p>
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
          </div>
          <div>
            <p className=" m-1 font-bold">自分とのマッチ度％の学校</p>
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
          </div>
          <div>
            <p className=" m-1 font-bold">自分とのマッチ度％の学校</p>
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default Results;
