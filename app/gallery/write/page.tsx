import FileUpload from "@/app/components/FileUpload";

export default function GWrite() {
  return (
    <div className="flex flex-col mx-auto w-full max-w-[1400px] justify-center items-center">
      <div className="text-center my-10 ">
        <h2 className="text-2xl font-semibold">갤러리 작성하기</h2>
      </div>

      <form className="w-full">
        <FileUpload />
        <input name="title" placeholder="제목입력하세요" className="w-full h-16 border pl-4" />
        <textarea name="content" placeholder="내용을 입력해주세요" className="w-full h-96 border mt-2 pl-4 pt-4" />

        <div className="flex w-full justify-center">
          <button type="submit" className="mt-4 border px-10 py-4 rounded-md text-lg bg-blue-500 text-white hover:bg-blue-600 ">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
