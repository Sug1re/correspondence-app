import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import MantineProvider from "@/providers/MantineProvider";
import SWRProvider from "@/providers/SWRProvider";

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
