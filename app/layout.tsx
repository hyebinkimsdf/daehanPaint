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
  openGraph: {
    title: '스타코 대한도료',
    description: '하자없는 완벽한 스타코 시공 보장! 전문 인력과 최신 장비를 바탕으로 꼼꼼한 시공과 철저한 사후 관리를 제공합니다.',
    url: 'https://www.stuccodaehandoryo.com/',
    siteName: '스타코 대한도료',
    images: [
      {
        url: 'https://www.stuccodaehandoryo.com/og_image.png',
        width: 1200,
        height: 630,
        alt: '스타코 대한도료',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
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
