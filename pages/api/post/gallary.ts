import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";

export default async function handler(요청: NextApiRequest, 응답: NextApiResponse) {
  if (요청.method === "POST") {
    if (요청.body.title === "") {
      return 응답.status(500).json("제목을 입력하세요.");
    }
    try {
      const client = await connectDB;

      const db = client.db("board");
      await db.collection("gallary").insertOne(요청.body); // result 제거
      return 응답.status(200).redirect(302, "/");
    } catch (error) {
      console.log(error);
      return 응답.status(500).json("서버 에러");
    }
  } else {
    응답.status(405).json({ message: "지원하지 않는 메서드" });
  }
}
