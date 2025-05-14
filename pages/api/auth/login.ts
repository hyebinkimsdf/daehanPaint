import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const { pw } = req.body;

      // 로그인 정보 검증
      if (pw === process.env.ADMIN_PASSWORD) {
        // 인증 성공 시 쿠키 설정 (localStorage 대신 쿠키 사용)
        const cookieOptions = process.env.NODE_ENV === "production" ? "HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600" : "HttpOnly; SameSite=Strict; Path=/"; // 개발 환경에서 Secure 제외

        res.setHeader("Set-Cookie", `auth=admin; ${cookieOptions}`);
        return res.status(200).json({ success: true });
      } else {
        // 인증 실패 시
        return res.status(401).json({ success: false, message: "잘못된 비밀번호입니다." });
      }
    } else {
      // POST 요청 외의 메서드 처리
      return res.status(405).json({ success: false, message: "지원되지 않는 요청입니다." });
    }
  } catch (error) {
    console.error("로그인 API 오류:", error);
    return res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
  }
}
