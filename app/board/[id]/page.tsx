import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import DetailClient from "./DetailClient";

interface Props {
  params: {
    id: string;
  };
}

export default async function BoardDetail({ params }: Props) {
  const db = (await connectDB).db("board");

  if (!ObjectId.isValid(params.id)) {
    return <div>❌ 유효하지 않은 게시물 ID입니다.</div>;
  }

  const result = await db.collection("board").findOne<{ title: string; content: string; password: string }>({ _id: new ObjectId(params.id) });

  if (!result) {
    return <div>❌ 게시물이 없습니다.</div>;
  }

  return <DetailClient post={result as { title: string; content: string; password: string; phone: string; name: string }} />;
}
