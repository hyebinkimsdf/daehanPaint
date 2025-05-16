import { Ask } from "../components/Ask";
import Image from "next/image";

export default function About() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-12">
      {/* 이미지 + 텍스트 묶음 */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-8">
        {/* 이미지 */}
        <div className="w-full md:w-1/2 relative">
          <Image src="/about/heroImg.jpg" alt="회사건물" layout="responsive" width={1200} height={800} className="object-cover" />
        </div>

        {/* 텍스트 */}
        <div className="flex flex-col w-full md:w-1/2">
          <h2 className="text-3xl text-sky-900 font-medium mb-4">안녕하십니까?</h2>
          <p className="text-xl md:text-2xl text-sky-900 mb-6">저희 스타코 대한도료를 방문해주신 모든 고객님들께 감사드립니다.</p>
          <p className="md:text-base text-sm mb-10 whitespace-pre-line">
            우리 업체는 언제나 고객 여러분들의 믿음과 신뢰를 바탕으로 스타코시공 전문업체로서, 오랜 경험을 가진 전문팀이 성실하고 꼼꼼한 시공 업무 및 철저한 사후관리로 고객 여러분들을 모시고 있습니다.
            또한 전문 기술 인력과 최신 장비를 다량 보유하고 있으며, 철저한 프로 정신 아래 정확하게 하자 원인을 분석하여 시공하고 있습니다. 언제나 성실과 신용으로 고객을 위해 최선을 다하는 스타코
            대한도료가 되도록 노력하겠습니다. 앞으로도 많은 관심과 사랑 부탁드립니다. 감사합니다.
          </p>
        </div>
      </div>

      {/* Ask 컴포넌트는 이미지+텍스트 영역 아래 독립적으로 */}
      <div className="w-full max-w-[1400px] mx-auto md:mt-12 ">
        <Ask />
      </div>
    </div>
  );
}
