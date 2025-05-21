import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const db = (await connectDB).db("board");

    // 가장 최근 번호를 가진 게시물 찾아오기
    const latestPost = await db.collection("board").find().sort({ postNumber: -1 }).limit(1).toArray();

    const latestNumber = latestPost.length > 0 ? latestPost[0].postNumber : 0; // 게시물이 없으면 0

    console.log("최신 게시물 번호 조회 결과:", latestNumber); // 디버깅용 로그

    return res.status(200).json({ latestNumber });
  } catch (error) {
    console.error("최근 번호 가져오기 실패:", error);
    return res.status(500).json({ message: "서버 오류" });
  }
}
