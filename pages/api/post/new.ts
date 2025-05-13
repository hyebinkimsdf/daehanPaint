import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { title, content, postNumber, password, name, phone } = req.body;

  // 공통 비밀번호 (관리자가 설정한 비밀번호)
  const commonPassword = process.env.ADMIN_PASSWORD;

  // 필수 필드 검증
  if (!title || !content) {
    return res.status(400).json({ message: "제목과 내용은 필수입니다." });
  }

  try {
    const db = (await connectDB).db("board");

    // postNumber가 없거나 유효하지 않을 경우 최신 번호 확인
    let finalPostNumber = postNumber;
    if (!finalPostNumber || finalPostNumber <= 0) {
      const latestPost = await db.collection("board").find().sort({ postNumber: -1 }).limit(1).toArray();
      finalPostNumber = latestPost.length > 0 ? latestPost[0].postNumber + 1 : 1;
    }

    // 새 게시글 추가
    const result = await db.collection("board").insertOne({
      title,
      content,
      postNumber: finalPostNumber,
      createdAt: new Date(),
      date: new Date(),
      password,
      commonPassword, // 공통 비밀번호 추가
      name,
      phone,
    });

    if (result.acknowledged) {
      return res.status(200).json({ message: "게시글 등록 성공" });
    } else {
      return res.status(500).json({ message: "게시글 등록 실패" });
    }
  } catch (error) {
    console.error("게시글 등록 중 오류 발생:", error);
    return res.status(500).json({ message: "서버 오류" });
  }
}
