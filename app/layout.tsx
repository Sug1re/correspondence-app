import type { Metadata } from "next";
import { AuthProvider } from "../context/AuthContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "新潟県の通信制高校検索アプリ",
  description: "通信制高校の各コースと学費が検索できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
