// /pages/api/post/delete.ts
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      // req.body가 이미 객체인지 문자열인지 확인하고 처리
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const { id, password } = body;

      // 비밀번호 확인
      if (password !== process.env.ADMIN_PASSWORD) {
        console.log("비밀번호 불일치"); // 로깅 추가
        return res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
      }

      // 데이터베이스 연결
      const db = (await connectDB).db("board");

      // 유효한 ID 확인
      if (!ObjectId.isValid(id)) {
        console.log("유효하지 않은 ID"); // 로깅 추가
        return res.status(400).json({ error: "유효하지 않은 게시물 ID입니다." });
      }

      // 삭제 실행
      const postResult = await db.collection("board").deleteOne({ _id: new ObjectId(id) });
      const galleryResult = await db.collection("gallary").deleteOne({ _id: new ObjectId(id) });

      console.log("삭제 결과:", { postResult, galleryResult }); // 로깅 추가

      return res.status(200).json({
        message: "삭제가 완료되었습니다.",
        deletedFromBoard: postResult.deletedCount,
        deletedFromGallery: galleryResult.deletedCount,
      });
    } catch (err) {
      console.error("삭제 처리 중 오류:", err);
      const errorMessage = err instanceof Error ? err.message : "알 수 없는 오류";
      return res.status(500).json({ error: "서버 오류가 발생했습니다.", details: errorMessage });
    }
  } else {
    return res.status(405).json({ error: "DELETE 메소드만 허용됩니다." });
  }
}
