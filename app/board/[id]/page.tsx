"use client";
// app/board/[id]/page.tsx
import { useParams } from "next/navigation";

export default function BoardDetail() {
  const params = useParams();
  const id = params?.id;

  // 임시 데이터
  const posts = [
    {
      id: "1500",
      title: "문의드립니다.",
      content:
        "안녕하세요. 공장 내부 바닥(약 300㎡)에 에폭시 코팅을 진행하려고 합니다. 사용 용도는 중장비 운행 포함이며, 미끄럼 방지 기능이 필요한 상황입니다. 자재비와 시공비 포함한 대략적인 견적을 요청드립니다.",
    },
    {
      id: "1501",
      title: "문의드립니다.",
      content: "알루미늄 부품에 분체 도장을 진행하고자 하는데, 표면 처리부터 완전 건조까지 예상 소요 시간을 알고 싶습니다. 하루 생산 가능 수량도 함께 안내 부탁드립니다.",
    },
    { id: "1502", title: "문의드립니다.", content: "500도 이상의 고온 환경에서 사용할 금속 부품에 적합한 내열 도료를 찾고 있습니다. 색상 유지와 내식성이 중요하며, 납기 일정도 함께 알고 싶습니다." },
    {
      id: "1503",
      title: "문의드립니다.",
      content:
        "현재 시설 벽면에 수성 아크릴 페인트가 도장되어 있습니다. 이 위에 우레탄 계열 도료로 재도장이 가능한지 궁금합니다. 사전 처리나 프라이머 사용 여부 등 시공 가능 조건을 안내해주시면 감사하겠습니다.",
    },
  ];

  // 선택된 게시물 찾기
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return <p>게시물을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="p-12 mx-auto w-full max-w-[1440px] flex flex-col justify-center items-center ">
      <h1 className="text-2xl font-bold border-b-2 w-full max-w-[1440p] text-center">게시물 상세 페이지</h1>
      <div className=" w-full max-w-[1440px] flex flex-col items-start">
        <h2 className="text-3xl mt-4">제목: {post.title}</h2>
        <p className="mt-2 text-xl">{post.content}</p>
      </div>
    </div>
  );
}
