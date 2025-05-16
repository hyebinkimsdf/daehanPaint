import { connectDB } from "@/util/database";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic"; // 🔥 서버 컴포넌트 캐시 끄기

export default async function Gallery() {
  const db = (await connectDB).db("board");
  const result = await db.collection("gallary").find().toArray();

  return (
    <div className="flex mt-2 md:mt-10  justify-center bg-gray-100 py-10">
      <div className="text-center max-w-[1400px] w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">갤러리</h1>
        <p className="text-lg text-gray-600 mb-8">실제 작업을 확인해보세요!</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {result.map((item) => {
            let images = [];
            try {
              images = typeof item.imageUrls === "string" ? JSON.parse(item.imageUrls) : item.imageUrls || [];
            } catch {
              images = [];
            }
            const firstImage = images.length > 0 ? images[0] : "/default.jpg";

            return (
              <Link key={item._id.toString()} href={`/gallery/${item._id.toString()}`}>
                <div>
                  <div className="relative w-full aspect-square">
                    <Image src={firstImage} alt="" fill className="object-cover rounded-lg" />
                  </div>
                  <p>{item.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <Link href="/gallery/write" className="flex items-end justify-end w-full mt-10">
          <button className="bg-slate-800 text-white px-8 py-4 font-semibold rounded-md">작성하기</button>
        </Link>
      </div>
    </div>
  );
}
