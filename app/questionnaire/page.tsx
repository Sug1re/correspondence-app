"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Questionnaire() {
  const [course, setCourse] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 結果ページに選択したコースをクエリとして渡す
    router.push(`/results?course=${encodeURIComponent(course)}`);
  };

  return (
    <main className=" bg-blue-200 pt-4 px-12 py-10">
      <Card className=" min-h-screen mx-4">
        <form onSubmit={handleSubmit} className=" p-8">
          <div>
            <CardTitle>アンケートタイトル</CardTitle>
            <label htmlFor="course">週何回登校したいですか？:</label>
            <select
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className=" border-2 border-gray-400 ml-2 rounded"
            >
              <option value="">選択してください</option>
              <option value="週1">週1</option>
              <option value="週2">週2</option>
              <option value="週3">週3</option>
              <option value="週4">週4</option>
              <option value="週5">週5</option>
              <option value="ネット">登校したくない</option>
            </select>
          </div>
          <button
            type="submit"
            className=" bg-blue-500 px-5 py-4 mt-6 text-white font-bold rounded w-2/3 hover:scale-105 hover:bg-blue-400 duration-200"
          >
            検索
          </button>
        </form>
      </Card>
    </main>
  );
}
