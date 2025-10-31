import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import MantineProvider from "@/providers/MantineProvider";
import SWRProvider from "@/providers/SWRProvider";

export const metadata: Metadata = {
  title: "新潟県の通信制高校検索アプリ",
  description:
    "新潟県内の通信制高校・サポート校を、学費や通学スタイル、登校日数などの条件から検索できるアプリケーション",
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
          <MantineProvider>
            <SWRProvider>
              <ToastProvider>
                <main>{children}</main>
              </ToastProvider>
            </SWRProvider>
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
