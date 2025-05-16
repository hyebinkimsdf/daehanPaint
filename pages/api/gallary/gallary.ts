import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database"; // connectDB가 제대로 import 되었는지 확인

export default async function handler(요청: NextApiRequest, 응답: NextApiResponse) {
  if (요청.method === "POST") {
    // 제목이 빈 값일 경우 처리
    if (!요청.body.title || 요청.body.title.trim() === "") {
      return 응답.status(400).json({ success: false, message: "제목을 입력하세요." });
    }

    const { password, title, content } = 요청.body;

    // 비밀번호가 없거나 틀린 경우 처리
    if (password !== process.env.ADMIN_PASSWORD) {
      return 응답.status(401).json({ success: false, message: "비밀번호가 일치하지 않습니다." });
    }

    try {
      
      // 데이터베이스 연결
      const db = (await connectDB).db("board");

      // 게시글 데이터 저장
      await db.collection("gallary").insertOne({
        title,
        content,
      });

      // 성공 응답
      return 응답.status(200).json({ success: true, message: "게시글이 성공적으로 등록되었습니다." });
    } catch (error) {
      console.error("서버 에러:", error);
      return 응답.status(500).json({ success: false, message: "서버 에러가 발생했습니다." });
    }
  } else {
    // POST가 아닌 다른 메서드로 요청 시 처리
    응답.status(405).json({ success: false, message: "지원하지 않는 메서드입니다." });
  }
}
