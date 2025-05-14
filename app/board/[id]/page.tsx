import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import DetailClient from "./DetailClient";

interface Props {
  params: {
    id: string; // params._id 대신 params.id로 변경
  };
}

export default async function BoardDetail({ params }: Props) {
  const db = (await connectDB).db("board");
  console.log("받은 _id:", params);

  if (!ObjectId.isValid(params.id)) {
    // params._id -> params.id
    return <div>❌ 유효하지 않은 게시물 ID입니다.</div>;
  }

  const result = await db.collection("board").findOne<{ _id: ObjectId; title: string; content: string; password: string; phone: string; name: string }>({ _id: new ObjectId(params.id) }); // { id: new ObjectId(params._id) } -> { _id: new ObjectId(params.id) }

  if (!result) {
    return <div>❌ 게시물이 없습니다.</div>;
  }

  return (
    <DetailClient
      post={{
        _id: result._id.toString(), // 이거 꼭 필요해!
        title: result.title,
        content: result.content,
        password: result.password,
        phone: result.phone,
        name: result.name,
      }}
    />
  );
}
