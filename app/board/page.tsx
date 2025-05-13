import { connectDB } from "@/util/database";
import Link from "next/link";

export const dynamic = "force-dynamic"; // 🔥 서버 컴포넌트 캐시 끄기

export default async function Board() {
  const db = (await connectDB).db("board");
  const result = await db.collection("board").find().toArray();

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

      {result.map((item) => (
        <Link key={item._id.toString()} href={`/board/${item._id.toString()}`} className="w-full">
          <div className="flex w-full justify-between px-8 h-16 items-center border-b-2 text-base font-medium max-w-[1400px]">
            <p className="pl-4">{item.postNumber}</p>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400 mx-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <p>문의드립니다</p> {/* 제목을 item.title로 변경 고민 */}
            </div>

            <p>{new Date(item.date).toLocaleDateString()}</p>
          </div>
        </Link>
      ))}

      <Link href="/write" className="flex items-end justify-end w-full mt-10">
        <button className="bg-slate-800 text-white px-8 py-4 font-semibold rounded-md">작성하기</button>
      </Link>
    </div>
  );
}
