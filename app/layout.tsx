import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleTagManager } from "@/components/GoogleTagManager";
import { Gnb } from "@/components/Gnb";
import { Footer } from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "스타코 대한도료",
  description: "스타코 시공전문 업체",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-slate-600 `}>
        <GoogleTagManager />
        <div className=" bg-slate-100 px-4 pb-20 ">
          <Gnb />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
