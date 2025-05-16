// app/gallery/page.tsx
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { connectDB } from "@/util/database";
import { Document, WithId } from "mongodb";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic"; // 🔥 서버 컴포넌트 캐시 끄기

type GalleryItemData = {
  title: string;
  content: string;
  imageUrls: string | string[];
  createdAt: Date;
};

// MongoDB 문서와 우리가 필요한 필드를 모두 포함하는 타입
type GalleryItem = WithId<Document> & GalleryItemData;

// 페이지 props 타입
type PageProps = {
  searchParams: { page?: string };
};

export default async function Gallery({ searchParams }: PageProps) {
  // 현재 페이지 번호 (기본값: 1)
  const currentPage = Number(searchParams.page) || 1;

  // 페이지당 아이템 수
  const itemsPerPage = 12;

  // DB 연결
  const db = (await connectDB).db("board");

  // 전체 아이템 수 조회
  const totalItems = await db.collection("gallary").countDocuments();

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 스킵할 아이템 수 계산
  const skip = (currentPage - 1) * itemsPerPage;

  // 페이지에 해당하는 아이템 조회
  const result = (await db
    .collection("gallary")
    .find()
    .sort({ createdAt: -1 }) // 최신순 정렬
    .skip(skip)
    .limit(itemsPerPage)
    .toArray()) as WithId<Document>[];

  // MongoDB 결과를 GalleryItem 타입으로 간주하여 사용
  const galleryItems = result as unknown as GalleryItem[];

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
    <div className="flex mt-2 md:mt-10 justify-center bg-gray-100 py-10">
      <div className="text-center max-w-[1400px] w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">갤러리</h1>
        <p className="text-lg text-gray-600 mb-8">실제 작업을 확인해보세요!</p>

        {galleryItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryItems.map((item) => {
              let images = [];
              try {
                images = typeof item.imageUrls === "string" ? JSON.parse(item.imageUrls) : item.imageUrls || [];
              } catch {
                images = [];
              }
              const firstImage = images.length > 0 ? images[0] : "/default.jpg";

              return (
                <Link key={item._id.toString()} href={`/gallery/${item._id.toString()}`}>
                  <div className=" mb-4">
                    <div className="relative w-full aspect-square mb-2">
                      <Image src={firstImage} alt="" fill className="object-cover rounded-lg" />
                    </div>
                    <p className="text-base">{item.title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">등록된 갤러리 항목이 없습니다.</p>
          </div>
        )}

        <Link href="/gallery/write" className="flex items-end justify-end w-full mt-10">
          <button className="bg-slate-800 text-white px-8 py-4 font-semibold rounded-md">작성하기</button>
        </Link>

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={`/gallery?page=${currentPage - 1}`} />
                  </PaginationItem>
                )}

                {showStartEllipsis && (
                  <>
                    <PaginationItem>
                      <PaginationLink href="/gallery?page=1">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  </>
                )}

                {pages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink href={`/gallery?page=${page}`} isActive={currentPage === page}>
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
                      <PaginationLink href={`/gallery?page=${totalPages}`}>{totalPages}</PaginationLink>
                    </PaginationItem>
                  </>
                )}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`/gallery?page=${currentPage + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
