// pages/api/verify-password.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { password } = req.body;

    // 비밀번호가 없거나 틀린 경우 처리
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "비밀번호가 일치하지 않습니다." });
    }

    return res.status(200).json({ success: true, message: "비밀번호 검증 성공" });
  } else {
    return res.status(405).json({ success: false, message: "지원하지 않는 메서드입니다." });
  }
}
