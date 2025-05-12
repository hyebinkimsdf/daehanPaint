"use client";

import { useEffect, useState } from "react";

export default function DetailClient({ post }: { post: any }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [inputPassword, setInputPassword] = useState(""); // 비밀번호 입력 상태
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false); // 비밀번호 일치 여부

  useEffect(() => {
    const checkAdmin = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.isAdmin) {
        setIsAdmin(true);
        setShowContent(true);
      }
    };
    checkAdmin();
  }, []);

  // 비밀번호 확인 함수
  const handlePasswordSubmit = () => {
    if (inputPassword === post.password || inputPassword === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      // 게시글의 비밀번호와 일치하는지 체크
      setIsPasswordCorrect(true); // 비밀번호가 맞으면 콘텐츠 보여줌
      setShowContent(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="p-12 mx-auto w-full max-w-[1440px] flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold border-b-2 w-full text-center">게시물 상세 페이지</h1>

      {/* 관리자일 때 바로 글 보여주기 */}
      {isAdmin && showContent ? (
        <div className="w-full max-w-[1440px] flex flex-col items-start">
          <h2 className="text-3xl mt-4">제목: {post.title}</h2>
          <p className="mt-2 text-xl">{post.content}</p>
        </div>
      ) : (
        // 비밀번호 입력 UI
        <div className="mt-4">
          {!isPasswordCorrect ? (
            <>
              <input type="password" placeholder="비밀번호를 입력하세요" className="border p-2" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
              <button onClick={handlePasswordSubmit} className="ml-2 p-2 bg-blue-500 text-white hover:bg-blue-600">
                확인
              </button>
            </>
          ) : (
            <div className="w-full max-w-[1440px] flex flex-col items-start">
              <h2 className="text-3xl mt-4">제목: {post.title}</h2>
              <p className="mt-2 text-xl">{post.content}</p>
            </div>
          )}
        </div>
      )}

      {/* 비회원이 비밀번호를 입력하지 않으면 내용 보지 못함 */}
      {!isAdmin && !isPasswordCorrect && <p className="mt-4">비밀번호를 입력해야 내용을 볼 수 있습니다.</p>}
    </div>
  );
}
