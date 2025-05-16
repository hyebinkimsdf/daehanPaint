"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Write() {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [postNumber, setPostNumber] = useState(0);
  const [loading, setLoading] = useState(false);
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
    setLoading(true); // 등록 시작

    const res = await fetch("/api/post/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, postNumber, password, commonPassword, name, phone }),
    });

    setLoading(false); // 등록 끝

    if (res.ok) {
      router.push("/board");
    } else {
      alert("등록 실패! 다시 시도해 주세요.");
    }
  };

  return (
    <div className="flex flex-col mx-auto w-full max-w-[1400px] justify-center items-center">
      <div className="text-center mt-20 ">
        <h2 className="text-2xl font-semibold">상담 신청하기</h2>
        <p className="text-base">궁금하신 사항을 게시판에 남겨주시면 빠르고 친절한 안내를 약속드립니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col mx-auto justify-center items-center my-10 rounded-md">
          <div className="py-10 px-4 bg-white border rounded-md  flex justify-center w-full max-w-[1400px]">
            <p className="text-start w-full max-w-[1000px]">
              개인정보 취급방침 <br />
              당사는 개인정보취급방침을 통하여 귀하께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
              <br /> * 개인정보의 수집목적 및 이용목적 당사는 이용자 확인, 문의상담 등의 목적으로써 귀하에게 최적의 서비스를 제공하기 위한 목적으로 귀하의 개인정보를 수집 이용하고 있습니다. 수집하는
              개인정보 항목에 따른 구체적인 수집목적 및 이용목적은 다음과 같습니다.
              <br /> <br /> 1. 성명, 이메일주소, 연락처 : 서비스 이용에 따른 본인 확인 절차에 이용 및 상담처리 <br /> 2. 문의내용, 첨부파일 및 기타 : 원할한 상담을 위한 참고자료
            </p>
          </div>
          <label>
            <input type="checkbox" required className="mt-6 scale-150" /> <strong>개인정보 수집 및 이용에 동의합니다</strong>
          </label>
        </div>
        <input name="password" type="password" placeholder="글 비밀번호" className="w-full h-12 border mt-2 px-4" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input name="name" placeholder="이름" className="w-1/2 h-16 border pl-4" value={name} onChange={(e) => setName(e.target.value)} required />
        <input name="phone" placeholder="전화번호" className="w-1/2 h-16 border pl-4" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input name="title" placeholder="제목입력하세요" className="w-full h-16 border pl-4" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea name="content" placeholder="문의 내용을 입력해주세요" className="w-full h-96 border mt-2 pl-4 pt-4" value={content} onChange={(e) => setContent(e.target.value)} required />
        <input type="hidden" name="postNumber" value={postNumber} />
        <div className="flex w-full justify-center">
          <button type="submit" disabled={loading} className={`mt-4 border px-10 py-4 rounded-md text-lg ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} text-white`}>
            {loading ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </form>
    </div>
  );
}
