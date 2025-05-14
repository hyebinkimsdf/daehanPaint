import { Ask } from "./components/Ask";

import { MainTelBanner } from "./components/MainTelBanner";
import { SliderImg } from "./components/SliderImg";
import Image from "next/image";

export default function Home() {
  // console.log("서버에서 읽은 비밀번호:", process.env.ADMIN_PASSWORD);
  return (
    <div className="max-w-[1400px] w-full mx-auto flex flex-col">
      <div className="h-[600px] flex flex-col-reverse gap-4 md:h-96 md:flex-row items-center justify-center">
        <SliderImg />
        <MainTelBanner />
      </div>
      <Image src="/main/subImg.png" alt="스타코 시공 에폭시전문" width={0} height={0} sizes="100vw" className="w-full h-auto" />
      <Ask />
    </div>
  );
}
