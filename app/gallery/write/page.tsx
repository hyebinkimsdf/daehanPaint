"use client";
import { useState, useEffect } from "react";
import FileUpload from "@/app/components/FileUpload";
import { useRouter } from "next/navigation";

export default function GWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const handlePasswordSubmit = async () => {
    if (!inputPassword.trim()) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    try {
      const res = await fetch("/api/gallary/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: inputPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setShowContent(true);
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("비밀번호 검증 중 오류 발생:", error);
      alert("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
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
      let imageUrls: string[] = [];

      if (selectedFiles.length > 0) {
        const uploadPromises = selectedFiles.map(async (file) => {
          const base64String = await convertFileToBase64(file);

          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              fileType: file.type,
              fileContentBase64: base64String,
            }),
          });

          if (!res.ok) {
            const errorText = await res.text();
            console.error("이미지 업로드 실패:", errorText);
            throw new Error(`이미지 '${file.name}' 업로드에 실패했습니다.`);
          }

          const data = await res.json();
          return data.imageUrl;
        });

        imageUrls = await Promise.all(uploadPromises);
      }

      const response = await fetch("/api/gallary/gallary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: inputPassword,
          title,
          content,
          imageUrls,
        }),
      });

      if (response.ok) {
        router.push("/gallery");
      } else {
        const errorData = await response.json();
        console.error("게시글 등록 실패:", errorData);
        alert(`등록 실패! ${errorData.message || "다시 시도해 주세요."}`);
      }
    } catch (error) {
      console.error("게시글 등록 중 오류 발생:", error);
      alert("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="flex flex-col mx-auto w-full max-w-[1400px] justify-center items-center">
      <div className="text-center my-10">
        <h2 className="text-2xl font-semibold">갤러리 작성하기</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : !showContent ? (
        <div className="p-8 flex flex-col items-center">
          <div className="mb-6 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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
              />
              <button type="button" onClick={handlePasswordSubmit} className="absolute right-2 top-2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors">
                확인
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form className="w-full" onSubmit={handleSubmit}>
          <FileUpload onFilesSelected={setSelectedFiles} />
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
