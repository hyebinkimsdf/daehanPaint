import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function board() {
  let db = (await connectDB).db("board");
  let result = await db.collection("board").find().toArray();

  return (
    <div className="flex flex-col mx-auto w-full max-w-[1400px] justify-center items-center">
      <div className="text-center mt-20 mb-10">
        <h2 className="text-2xl font-semibold">문의 게시판</h2>
        <p className="text-base">문의사항은 게시판에 남겨주시면 신속하게 안내해드리겠습니다</p>
      </div>

      <div className="flex w-full justify-between px-12 h-16 items-center bg-slate-200 text-lg font-semibold">
        <p>번호</p>
        <p>제목</p>
        <p>날짜</p>
      </div>

      {result.map((item, _index) => (
        <Link key={item._id.toString()} href={`/board/${item._id.toString()}`} className="w-full">
          <div className="flex w-full justify-between px-8 h-16 items-center border-b-2 text-base font-medium max-w-[1400px] ">
            <p className="pl-4">{item.postNumber}</p>
            <p>문의드립니다.</p>
            <p>{item.date}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
