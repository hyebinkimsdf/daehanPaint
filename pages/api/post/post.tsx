import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function test(요청: NextApiRequest, 응답: NextApiResponse) {
  if (요청.method == "POST") {
    if (요청.body.title === "") {
      return 응답.status(500).json("제목을 입력하세요.");
    }
    try {
      const client = await connectDB;
      const db = client.db("forum");
      let result = await db.collection("post").insertOne(요청.body);
      return 응답.status(200).redirect(302, "/");
    } catch (error) {
      console.log(error);
      return 응답.status(500).json("서버 에러");
    }
  }
}
