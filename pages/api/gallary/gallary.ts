import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!req.body.title || req.body.title.trim() === "") {
      return res.status(400).json({ success: false, message: "제목을 입력하세요." });
    }

    const { password, title, content, imageUrls } = req.body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "비밀번호가 일치하지 않습니다." });
    }

    try {
      const db = (await connectDB).db("board");

      await db.collection("gallary").insertOne({
        title,
        content,
        imageUrls: JSON.stringify(imageUrls || []), // 이미지 URL 배열 JSON 문자열 저장
        createdAt: new Date(),
      });

      return res.status(200).json({ success: true, message: "게시글이 성공적으로 등록되었습니다." });
    } catch (error) {
      console.error("서버 에러:", error);
      return res.status(500).json({ success: false, message: "서버 에러가 발생했습니다." });
    }
  } else {
    return res.status(405).json({ success: false, message: "지원하지 않는 메서드입니다." });
  }
}
