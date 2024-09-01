import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Footer from "@/app/components/layout/footer";
import Header from "@/app/components/layout/header/header";
import { NextAuthProvider } from "@/app/components/providers/next-auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Path",
  description:
    "あなたも記事を投稿しよう。既存の記事や学習動画からオリジナルのITに関する学習ルートを制作、投稿することができます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          <main>
            <Toaster position="top-center" />
            {children}
          </main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
