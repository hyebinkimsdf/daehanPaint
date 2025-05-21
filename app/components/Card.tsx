export default function Card() {
  const Cardprop = [
    {
      title: "믿을 수 있는 스타코 시공 전문업체",
      contents: "전문 인력과 최신 장비를 바탕으로 꼼꼼한 시공과 철저한 사후관리를 제공합니다.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 mx-auto mb-4 stroke-current text-blue-800"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: "빠르고 정확한 시공 서비스",
      contents: "최신 장비와 전문 기술로 신속하고 정확한 작업을 약속드립니다.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 mx-auto mb-4 stroke-current text-blue-800"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      title: "철저한 사후관리 시스템",
      contents: "하자 발생 시 원인을 정확히 분석하여 신속하게 대응합니다.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 mx-auto mb-4 stroke-current text-blue-800"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-[1440px] w-full mx-auto my-6">
      <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
        {Cardprop.map(({ title, contents, icon }, index) => (
          <div key={index} className="flex-1 bg-white rounded-lg shadow-md text-center p-8 sm:p-12 md:p-16 ">
            {icon}
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{contents}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
