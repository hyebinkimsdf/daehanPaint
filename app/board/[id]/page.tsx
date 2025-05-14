import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import DetailClient from "./DetailClient";

interface Props {
  params: {
    _id: string;
  };
}

export default async function BoardDetail({ params }: Props) {
  const db = (await connectDB).db("board");

  if (!ObjectId.isValid(params._id)) {
    return <div>❌ 유효하지 않은 게시물 ID입니다.</div>;
  }

  const result = await db.collection("board").findOne<{ _id: ObjectId; title: string; content: string; password: string; phone: string; name: string }>({ id: new ObjectId(params._id) });

  if (!result) {
    return <div>❌ 게시물이 없습니다.</div>;
  }

  return (
    <DetailClient
      post={{
        id: result._id.toString(), // 이거 꼭 필요해!
        title: result.title,
        content: result.content,
        password: result.password,
        phone: result.phone,
        name: result.name,
      }}
    />
  );
}
