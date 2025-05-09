"use client";
import Link from "next/link";
import { useState } from "react";

export function Gnb() {
  const page = [
    { name: "인사말", link: "/about" },
    { name: "영업안내", link: "/business" },
    { name: "갤러리", link: "/gallery" },
    { name: "게시판", link: "/board" },
    { name: "오시는길", link: "/location" },
  ];

  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-between  w-full max-w-[1400px] mx-auto ">
      <Link href={"/"} onClick={() => setSelected(null)}>
        <div className="flex flex-col items-center justify-between p-4 mb-10">
          <h1 className="text-lg">스타코 시공전문 업체</h1>
          <p className="text-3xl font-bold">스타코 대한도료</p>
        </div>
      </Link>

      {/* 카테고리 */}
      <ul className="flex items-center justify-center bg-gray-500 w-full text-white h-16 rounded-md">
        {page.map((item, index) => (
          <Link href={item.link} key={index}>
            <li
              onClick={() => setSelected(index)}
              className={`text-sm md:text-lg font-normal px-8 md:px-10 md:py-2 py-4 rounded-full cursor-pointer 
              ${selected === index ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}
            >
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
