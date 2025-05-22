// app/board/page.tsx
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { connectDB } from "@/lib/database";
import { Document, WithId } from "mongodb";
import Link from "next/link";

export const dynamic = "force-dynamic"; // 🔥 서버 컴포넌트 캐시 끄기

// 게시판 아이템 데이터 타입 정의
type BoardItemData = {
  title?: string;
  content?: string;
  date: Date | string;
  postNumber?: number;
};

// MongoDB 문서와 우리가 필요한 필드를 모두 포함하는 타입
type BoardItem = WithId<Document> & BoardItemData;

// 페이지 props 타입
type PageProps = {
  searchParams: { page?: string };
};

export default async function Board({ searchParams }: PageProps) {
  // 현재 페이지 번호 (기본값: 1)
  const currentPage = Number(searchParams.page) || 1;

  // 페이지당 아이템 수
  const itemsPerPage = 10; // 게시판은 일반적으로 한 페이지에 10개 정도가 적당

  // DB 연결
  const db = (await connectDB).db("board");

  // 전체 아이템 수 조회
  const totalItems = await db.collection("board").countDocuments();

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 스킵할 아이템 수 계산
  const skip = (currentPage - 1) * itemsPerPage;

  // 페이지에 해당하는 아이템 조회 (최신순 정렬)
  const result = (await db
    .collection("board")
    .find()
    .sort({ date: -1 }) // 최신순 정렬
    .skip(skip)
    .limit(itemsPerPage)
    .toArray()) as WithId<Document>[];

  // MongoDB 결과를 BoardItem 타입으로 간주하여 사용
  const boardItems = result as unknown as BoardItem[];

  // 페이지네이션 버튼 생성 함수
  const generatePagination = (currentPage: number, totalPages: number) => {
    // 표시할 페이지 버튼 최대 개수
    const maxPageButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    // 시작 페이지 조정
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    // 페이지 번호 배열 생성
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return {
      showStartEllipsis: startPage > 1,
      showEndEllipsis: endPage < totalPages,
      pages,
    };
  };

  const { showStartEllipsis, showEndEllipsis, pages } = generatePagination(currentPage, totalPages);

  return (
    <div className="flex flex-col mx-auto w-full max-w-[1400px] justify-center items-center">
      <div className="text-center mt-10 md:mt-14 mb-6">
        <h2 className="text-2xl font-semibold">문의 게시판</h2>
        <p className="text-sm md:text-base w-64 md:w-full">문의사항은 게시판에 남겨주시면 신속히 안내해드리겠습니다</p>
      </div>

      <div className="flex w-full justify-between px-12 h-16 items-center bg-slate-200 text-base md:text-lg font-semibold">
        <div>번호</div>
        <div>제목</div>
        <div>날짜</div>
      </div>

      {boardItems.length > 0 ? (
        boardItems.map((item) => (
          <Link key={item._id.toString()} href={`/board/${item._id.toString()}`} className="w-full">
            <div className="flex w-full justify-between px-8 h-16 items-center border-b-2 text-base font-medium max-w-[1400px]">
              <p className="pl-4">{item.postNumber}</p>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mx-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <p>문의드립니다</p> {/* 추후 item.title로 변경 가능 */}
              </div>
              <p>{new Date(item.date).toLocaleDateString()}</p>
            </div>
          </Link>
        ))
      ) : (
        <div className="w-full py-8 text-center border-b-2">
          <p className="text-gray-500">등록된 게시글이 없습니다.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 w-full flex justify-center">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={`/board?page=${currentPage - 1}`} />
                </PaginationItem>
              )}

              {showStartEllipsis && (
                <>
                  <PaginationItem>
                    <PaginationLink href="/board?page=1">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </>
              )}

              {pages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink href={`/board?page=${page}`} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {showEndEllipsis && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={`/board?page=${totalPages}`}>{totalPages}</PaginationLink>
                  </PaginationItem>
                </>
              )}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext href={`/board?page=${currentPage + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <Link href="/write" className="flex items-end justify-end w-full mt-10">
        <button className="bg-slate-800 text-white px-8 py-4 font-semibold rounded-md">작성하기</button>
      </Link>
    </div>
  );
}
