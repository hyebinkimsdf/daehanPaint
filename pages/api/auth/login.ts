import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const { id, pw } = req.body;

      // 로그인 정보 검증
      if (id === process.env.ADMIN_ID && pw === process.env.ADMIN_PASSWORD) {
        // 인증 성공 시
        res.setHeader("Set-Cookie", "auth=admin; Path=/; HttpOnly; Secure; SameSite=Strict");
        return res.status(200).json({ success: true });
      } else {
        // 인증 실패 시
        return res.status(401).json({ success: false, message: "잘못된 ID 또는 비밀번호입니다." });
      }
    } else {
      return res.status(405).json({ success: false, message: "지원되지 않는 요청입니다." });
    }
  } catch (error) {
    console.error("로그인 API 오류:", error);
    return res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
  }
}
