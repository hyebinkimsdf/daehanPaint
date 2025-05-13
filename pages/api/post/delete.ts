// /pages/api/post/delete.ts

import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      const { id, password } = JSON.parse(req.body);

      if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: "비밀번호 틀림" });
      }

      const db = (await connectDB).db("board");

      // 갤러리와 board 둘 다 삭제
      await db.collection("gallary").deleteOne({ _id: new ObjectId(id) });
      await db.collection("board").deleteOne({ _id: new ObjectId(id) });

      return res.status(200).json({ message: "삭제 성공" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "서버 오류" });
    }
  } else {
    return res.status(405).json({ error: "허용되지 않은 요청" });
  }
}
