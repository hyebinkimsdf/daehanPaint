import Image from "next/image";

export function MainTelBanner() {
  return (
    <div className="bg-black bg-opacity-20 w-full md:w-[40%] md:h-full h-96 py-20 md:py-10 flex flex-col justify-center items-center relative">
      {/* 배경 이미지 */}
      <Image src="/main/tel_bg2.jpg" alt="스타코 시공·자재 판매 01053621597" fill className="object-cover z-0 relative" />

      {/* 검은색 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

      {/* 텍스트 콘텐츠 */}
      <div className="flex flex-col items-start justify-center gap-2  px-24 py-8 md:px-12 md:py-16 absolute z-10 text-white text-sm  lg:text-base">
        <h3 className="text-2xl">스타코 대한도료</h3>
        <p>STUCOFLEX | 플레시텍스</p>
        <p>일반스타코(데코, 노말)파렉스</p>
        <p>스타코 시공·자재 판매</p>

        <p className="font-medium text-2xl mt-8 md:mt-16">고객센터 010-5362-1597 </p>
      </div>
    </div>
  );
}
