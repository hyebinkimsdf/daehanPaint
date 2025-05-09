"use client";
import Link from "next/link";
import { useState } from "react";

export function Gnb() {
  const page = [
    { name: "인사말", link: "/about" },
    { name: "영업안내", link: "/" },
    { name: "갤러리", link: "/" },
    { name: "게시판", link: "/" },
    { name: "오시는길", link: "/" },
  ];

  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-between mb-10 w-full max-w-[1400px]">
      <div className="flex flex-col items-center justify-between p-4 mb-10">
        <h1 className="text-lg">스타코 시공전문 업체</h1>
        <p className="text-3xl font-bold">스타코 대한도료</p>
      </div>

      {/* 카테고리 */}
      <ul className="flex items-center justify-between px-36 bg-gray-500 w-full text-white h-16 rounded-md">
        {page.map((item, index) => (
          <li
            key={index}
            onClick={() => setSelected(index)}
            className={`text-sm md:text-lg font-normal px-10 py-2 rounded-full cursor-pointer 
              ${selected === index ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}
          >
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
