import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

interface PageParams {
  id: string;
}

export default async function DetailGallery({ params }: { params: PageParams }) {
  const db = (await connectDB).db("board");
  const post = await db.collection("gallary").findOne({ _id: new ObjectId(params.id) });

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-[1400px] mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                {post.author ? post.author : "담당자"}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {post.date ? new Date(post.date).toLocaleDateString() : new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 whitespace-pre-wrap">
            <p className="text-gray-700 leading-relaxed">{post.content}</p>
          </div>

          <div className="mt-8 flex justify-end">
            <a href="/gallery" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              목록으로
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
