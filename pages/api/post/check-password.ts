import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "허용되지 않은 메서드입니다." });
  }

  const { _id, password: inputPassword } = req.body;

  try {
    const client = await connectDB;
    const db = client.db("board");

    const post = await db.collection("board").findOne({ _id: new ObjectId(_id) });

    if (!post) {
      return res.status(404).json({ success: false, message: "게시글을 찾을 수 없습니다." });
    }

    const plainPost = {
      ...post,
      _id: post._id.toString(), // ✅ 순수 문자열로 변환
    };

    if (inputPassword === post.password || inputPassword === post.commonPassword) {
      return res.status(200).json({ success: true, post: plainPost });
    } else {
      return res.status(401).json({ success: false, message: "비밀번호가 틀렸습니다." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "서버 오류" });
  }
}
