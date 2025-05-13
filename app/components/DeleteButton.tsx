"use client";
import { useState } from "react";

export default function DeleteButton({ postId, redirectTo }: { postId: string; redirectTo: string }) {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  const handleDelete = async () => {
    if (!password) return alert("비밀번호를 입력해주세요!");

    const res = await fetch("/api/post/delete", {
      method: "DELETE",
      body: JSON.stringify({ id: postId, password }),
    });

    if (res.ok) {
      alert("삭제 완료!");
      window.location.href = redirectTo; // 여기만 바뀜!
    } else {
      alert("삭제 실패! 비밀번호가 틀렸을 수 있어요.");
    }

    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
        삭제하기
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">비밀번호 입력</h2>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded w-full mb-4" placeholder="비밀번호를 입력하세요" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                취소
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
