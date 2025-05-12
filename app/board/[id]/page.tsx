import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

interface Props {
  params: {
    id: string;
  };
}

export default async function BoardDetail({ params }: Props) {
  const db = (await connectDB).db("board");

  // ObjectId 유효성 검사
  if (!ObjectId.isValid(params.id)) {
    return <div>❌ 유효하지 않은 게시물 ID입니다.</div>;
  }

  // id 값을 기반으로 특정 게시물 하나만 가져오기
  const result = await db.collection("board").findOne({ _id: new ObjectId(params.id) });

  return (
    <div className="p-12 mx-auto w-full max-w-[1440px] flex flex-col justify-center items-center ">
      <h1 className="text-2xl font-bold border-b-2 w-full text-center">게시물 상세 페이지</h1>
      <div className="w-full max-w-[1440px] flex flex-col items-start">
        <h2 className="text-3xl mt-4">제목: {result?.title}</h2>
        <p className="mt-2 text-xl">{result?.content}</p>
      </div>
    </div>
  );
}
