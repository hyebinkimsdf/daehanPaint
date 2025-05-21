import Image from "next/image";
import { Ask } from "../components/Ask";

export default function Business() {
  return (
    <div className="flex flex-col max-w-[1400px] mx-auto px-4 md:gap-8">
      <div className="flex flex-col md:flex-row justify-start items-start gap-8 mt-12 max-w-[1400px] mx-auto">
        <div className="w-full md:w-1/2 relative">
          <Image src="/about/hero.webp" alt="횡계 리치몬드빌라" layout="responsive" width={1200} height={800} className="object-cover rounded-md" />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <h2 className="text-3xl text-sky-900 font-medium mb-4">스타코 대한도료 주요업무를 소개합니다</h2>
          <p className="text-xl md:text-2xl text-sky-900 mb-6">STUCOFLEX·플레시텍스·일반스타코(데코, 노말, 그래뉼)파렉스 스타코시공업체·자제판매</p>
          <p className="md:text-base text-sm mb-10 whitespace-pre-line">
            우리 업체는 언제나 고객 여러분들의 믿음과 신뢰를 바탕으로 스타코시공 전문업체로서, 오랜 경험을 가진 전문팀이 성실하고 꼼꼼한 시공 업무 및 철저한 사후관리로 고객 여러분들을 모시고 있습니다.
            또한 전문 기술 인력과 최신 장비를 다량 보유하고 있으며, 철저한 프로 정신 아래 정확하게 하자 원인을 분석하여 시공하고 있습니다. 언제나 성실과 신용으로 고객을 위해 최선을 다하는 스타코
            대한도료가 되도록 노력하겠습니다. 앞으로도 많은 관심과 사랑 부탁드립니다. 감사합니다.
          </p>
        </div>
      </div>

      {/* 이미지리스트 */}
      <div className="flex flex-col md:flex-row gap-4 max-w-[1400px] w-full px-4 mx-auto mb-4">
        {[1, 2, 3].map((num) => (
          <div key={num} className="w-full ">
            <Image
              src={`/business/imgList0${num}.webp`}
              alt="사업관련이미지"
              layout="responsive"
              width={461}
              height={307} // 이미지 비율 맞게 수정 필요
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      <Ask />
    </div>
  );
}
