"use client";
import DeleteButton from "@/components/DeleteButton";
import { useState } from "react";

interface Post {
  _id: string;
  title: string;
  name: string;
  phone: string;
  content: string;
  password: string;
}

export default function DetailClient({ post }: { post: Post }) {
  const [showContent, setShowContent] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordSubmit = async () => {
    try {
      setIsLoading(true);

      const res = await fetch("/api/post/check-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: post._id, // post.id 추가
          password: inputPassword, // 비밀번호 값 전달
        }),
      });

      const result = await res.json();

      if (result.success) {
        setShowContent(true);
        // 필요한 경우 result.post로 내용 갱신도 가능
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error); // 오류 로그 출력
      alert("오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      handlePasswordSubmit();
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-[1400px] mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 py-4 px-6">
          <h1 className="text-2xl font-bold text-white text-center">문의 게시판</h1>
        </div>

        {isLoading ? (
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
              <p className="text-gray-500 mt-2">이 게시글을 확인하려면 비밀번호를 입력하세요.</p>
            </div>

            <div className="w-full max-w-md">
              <div className="relative">
                <input
                  type="password"
                  placeholder="비밀번호 입력"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  onKeyDown={handleKeyPress} // 엔터키로 제출 가능하게 처리
                />
                <button onClick={handlePasswordSubmit} className="absolute right-2 top-2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors">
                  확인
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-8">
            <div className="border-b pb-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
              <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span className="font-medium">이름:</span>&nbsp;{post.name}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <span className="font-medium">연락처:</span>&nbsp;{post.phone}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 whitespace-pre-wrap">
              <p className="text-gray-700 leading-relaxed">{post.content}</p>
            </div>

            <div className="w-full flex justify-end mt-4">
              <DeleteButton postId={post._id} redirectTo="/board" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
