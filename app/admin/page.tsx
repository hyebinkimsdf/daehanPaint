"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, pw }),
    });

    const data = await res.json(); // 응답을 JSON으로 파싱

    if (res.ok) {
      router.push("/admin"); // 로그인 성공 시 관리자 페이지로
    } else {
      alert(data.message || "로그인 실패!"); // 서버에서 보낸 오류 메시지 출력
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col items-center mt-20">
      <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} className="border p-2 mb-2" />
      <input type="password" placeholder="PW" value={pw} onChange={(e) => setPw(e.target.value)} className="border p-2 mb-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        관리자 로그인
      </button>
    </form>
  );
}
