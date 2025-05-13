import { connectDB } from "@/util/database";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic"; // 🔥 서버 컴포넌트 캐시 끄기

export default async function Gallery() {
  // const imgList = [
  //   {
  //     src: "/gallery/item01.jpg",
  //     alt: "포트폴리오01",
  //   },
  //   {
  //     src: "/gallery/item02.jpg",
  //     alt: "포트폴리오02",
  //   },
  //   {
  //     src: "/gallery/item03.jpg",
  //     alt: "포트폴리오03",
  //   },
  //   {
  //     src: "/gallery/item04.jpg",
  //     alt: "포트폴리오04",
  //   },
  //   {
  //     src: "/gallery/item05.jpg",
  //     alt: "포트폴리오05",
  //   },
  //   {
  //     src: "/gallery/item06.jpg",
  //     alt: "포트폴리오06",
  //   },
  //   {
  //     src: "/gallery/item07.jpg",
  //     alt: "포트폴리오07",
  //   },
  //   {
  //     src: "/gallery/item08.jpg",
  //     alt: "포트폴리오08",
  //   },
  // ];

  const db = (await connectDB).db("board");
  const result = await db.collection("gallary").find().toArray();
  console.log(result);

  return (
    <div className="flex mt-2 md:mt-10  justify-center bg-gray-100 py-10">
      <div className="text-center max-w-[1400px] w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">갤러리</h1>
        <p className="text-lg text-gray-600 mb-8">실제 작업을 확인해보세요!</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {result.map((item) => (
            <Link key={item._id.toString()} href={`/gallery/${item._id.toString()}`}>
              <div>
                <div className="relative w-full aspect-square">
                  <Image src={item.img || "/default.jpg"} alt="" fill className="object-cover rounded-lg" />
                </div>
                <p>{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/gallery/write" className="flex items-end justify-end w-full mt-10">
          <button className="bg-slate-800 text-white px-8 py-4 font-semibold rounded-md">작성하기</button>
        </Link>
      </div>
    </div>
  );
}
