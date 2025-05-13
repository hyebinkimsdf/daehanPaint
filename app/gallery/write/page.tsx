"use client";

import FileUpload from "@/app/components/FileUpload";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function GWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // 페이지 로드 시 로딩 상태를 잠시 유지한 후 비밀번호 입력 화면 표시
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value); // 제목 상태 업데이트
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value); // 내용 상태 업데이트
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handlePasswordSubmit();
    }
  };

  const handlePasswordSubmit = () => {
    // 환경변수에서 비밀번호 가져오기
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (inputPassword === adminPassword) {
      setShowContent(true);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력하세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    try {
      // 현재 설정된 postNumber와 함께 데이터 전송
      const res = await fetch("/api/post/gallary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        router.push("/gallery"); // 등록 성공 시 이동
      } else {
        const errorData = await res.json();
        alert(`등록 실패! ${errorData.message || "다시 시도해 주세요."}`);
      }
    } catch (error) {
      console.error("게시글 등록 중 오류 발생:", error);
      alert("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="flex flex-col mx-auto w-full max-w-[1400px] justify-center items-center">
      <div className="text-center my-10 ">
        <h2 className="text-2xl font-semibold">갤러리 작성하기</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : !showContent ? (
        <div className="p-8 flex flex-col items-center">
          <div className="mb-6 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <h2 className="text-xl font-semibold text-gray-700">보안 게시글</h2>
            <p className="text-gray-500 mt-2">이 게시글을 작성하려면 비밀번호를 입력하세요.</p>
          </div>

          <div className="w-full max-w-md">
            <div className="relative">
              <input
                type="password"
                placeholder="비밀번호 입력"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={handlePasswordSubmit} className="absolute right-2 top-2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors">
                확인
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form className="w-full" onSubmit={handleSubmit}>
          <FileUpload />
          <input name="title" placeholder="제목을 입력하세요" value={title} onChange={handleTitleChange} className="w-full h-16 border pl-4" required />
          <textarea name="content" placeholder="내용을 입력해주세요" value={content} onChange={handleContentChange} className="w-full h-96 border mt-2 pl-4 pt-4" required />

          <div className="flex w-full justify-center">
            <button type="submit" className="mt-4 border px-10 py-4 rounded-md text-lg bg-blue-500 text-white hover:bg-blue-600">
              등록하기
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
