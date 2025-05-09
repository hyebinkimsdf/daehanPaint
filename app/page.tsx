import { Gnb } from "./components/Gnb";
import { MainTelBanner } from "./components/MainTelBanner";
import { SliderImg } from "./components/SliderImg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-[1400px] w-full px-4 mx-auto flex flex-col">
      <Gnb />
      <div className="flex flex-col ">
        <div className="h-[600px] flex flex-col-reverse gap-4 md:h-96 md:flex-row items-center justify-center">
          <SliderImg />
          <MainTelBanner />
        </div>
        <Image src="/main/subImg.png" alt="스타코 시공 에폭시전문" width={0} height={0} sizes="100vw" className="w-full h-auto" />
        <div className="w-full bg-slate-400  h-40  text-white flex flex-col justify-center items-center ">
          <p className="font-thin text-2xl">Customer Center</p>
          <p className="font-light text-3xl">게시판 문의하기</p>
          <p className="font-light text-base mt-4">궁금하신 사항이나 스타코 시공 관련 문의사항은 게시판에 남겨주시면 신속하게 안내해드리겠습니다</p>
        </div>
      </div>
    </div>
  );
}
