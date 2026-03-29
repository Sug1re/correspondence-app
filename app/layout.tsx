import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import MantineProvider from "@/providers/MantineProvider";
import SWRProvider from "@/providers/SWRProvider";
import { SettingProvider } from "@/context/SettingContext";

export const metadata: Metadata = {
  title: "N高等学校・S高等学校・R高等学校紹介サイト",
  description: "生徒が作成したサイトです。",
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
                <SettingProvider>
                  <main>{children}</main>
                </SettingProvider>
              </ToastProvider>
            </SWRProvider>
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
