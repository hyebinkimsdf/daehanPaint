"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Write() {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [postNumber, setPostNumber] = useState(0);
  const [commonPassword] = useState(""); // 공통 비밀번호
  const router = useRouter();

  useEffect(() => {
    const fetchLatestPostNumber = async () => {
      try {
        const res = await fetch("/api/post/latest-number");
        if (res.ok) {
          const data = await res.json();
          console.log("가장 최근 게시물 번호:", data.latestNumber); // 디버깅용 로그
          setPostNumber(data.latestNumber + 1);
        } else {
          console.error("최근 게시물 번호를 가져오는데 실패했습니다.");
          setPostNumber(1); // 실패하면 1로 설정
        }
      } catch (error) {
        console.error("최근 게시물 번호 요청 오류:", error);
        setPostNumber(1); // 오류 발생 시 1로 설정
      }
    };

    fetchLatestPostNumber();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 현재 설정된 postNumber와 함께 데이터 전송
    const res = await fetch("/api/post/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, postNumber, password, commonPassword }),
    });

    if (res.ok) {
      router.push("/board"); // 등록 성공 시 이동
    } else {
      alert("등록 실패! 다시 시도해 주세요.");
    }
  };

  return (
    <div className="flex flex-col mx-auto w-full max-w-[1400px] justify-center items-center">
      <div className="text-center mt-20 mb-10">
        <h2 className="text-2xl font-semibold">문의 게시판</h2>
        <p className="text-base">문의사항은 게시판에 남겨주시면 신속하게 안내해드리겠습니다</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <input name="password" type="password" placeholder="글 비밀번호" className="w-full h-12 border mt-2 px-2" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <input name="title" placeholder="제목입력하세요" className="w-full h-16 border" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea name="content" placeholder="문의 내용을 입력해주세요" className="w-full h-96 border mt-2" value={content} onChange={(e) => setContent(e.target.value)} required />
        <input type="hidden" name="postNumber" value={postNumber} />

        <button type="submit" className="mt-4 border p-2 bg-blue-500 text-white hover:bg-blue-600">
          등록하기
        </button>
      </form>
    </div>
  );
}
