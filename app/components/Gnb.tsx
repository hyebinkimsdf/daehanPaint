"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Gnb() {
  const page = [
    { name: "인사말", link: "/about" },
    { name: "영업안내", link: "/business" },
    { name: "갤러리", link: "/gallery" },
    { name: "문의 게시판", link: "/board" },
    { name: "오시는길", link: "/location" },
  ];

  const [selected, setSelected] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 모바일 메뉴가 열릴 때 스크롤 막기
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* 모바일 메뉴 오버레이 */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden" onClick={() => setIsMobileMenuOpen(false)} />}

      <div className="flex flex-col items-center w-full max-w-[1400px] mx-auto pt-6 relative z-20">
        <Link href="/" onClick={() => setSelected(null)}>
          <div className="flex flex-col items-center p-3 mb-6 text-center">
            <h1 className="text-sm sm:text-base">스타코 시공전문 업체</h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">스타코 대한도료</p>
          </div>
        </Link>

        {/* 데스크탑용 GNB */}
        <ul className="hidden sm:flex flex-wrap justify-center gap-2 bg-gray-500 w-full text-white py-3 px-2 rounded-md">
          {page.map((item, index) => (
            <Link href={item.link} key={index}>
              <li
                onClick={() => setSelected(index)}
                className={`text-sm md:text-lg font-normal px-4 py-2 rounded-full cursor-pointer transition-colors duration-200
                ${selected === index ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>

        {/* 모바일 메뉴 버튼 */}
        <button className="sm:hidden flex items-center justify-center bg-gray-500 w-full text-white px-4 py-3 rounded-md mt-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="ml-2 text-sm font-medium">{isMobileMenuOpen ? "닫기" : "메뉴"}</span>
        </button>

        {/* 모바일 GNB */}
        {isMobileMenuOpen && (
          <div className="sm:hidden absolute top-full left-0 w-full mt-2 rounded-md shadow-lg z-20">
            <ul className="flex flex-col gap-2 bg-gray-500 w-full text-white py-4 px-4 rounded-md">
              {page.map((item, index) => (
                <Link href={item.link} key={index} className="w-full">
                  <li
                    onClick={() => {
                      setSelected(index);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-base font-normal px-4 py-3 rounded-md cursor-pointer transition-colors duration-200 w-full
                    ${selected === index ? "bg-white text-black font-medium" : "hover:bg-gray-400"}`}
                  >
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
