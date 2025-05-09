import Link from "next/link";

export function Gnb() {
  const page = [
    { name: "인사말", link: "/about" },
    { name: "영업안내", link: "/about" },
    { name: "갤러리", link: "/about" },
    { name: "게시판", link: "/about" },
    { name: "오시는길", link: "/about" },
    // TODO: 링크변경해야함
  ];
  return (
    <>
      <div className="flex flex-col items-center justify-between p-4">
        <div className="flex flex-col items-center justify-between p-4 mb-10">
          <h1 className=" text-lg">스타코 시공전문 업체</h1>
          <p className="text-3xl font-bold">스타코 대한도료</p>
        </div>

        {/* 카테고리 */}
        <ul className="flex gap-10 items-center justify-between">
          {page.map((item, index) => (
            <li className="text-lg font-normal" key={index}>
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
         
        </ul>
      </div>
    </>
  );
}
