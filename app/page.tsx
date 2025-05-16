import { Ask } from "./components/Ask";
import Card from "./components/Card";

import { MainTelBanner } from "./components/MainTelBanner";
import { SliderImg } from "./components/SliderImg";

export default function Home() {
  return (
    <div className="max-w-[1400px] w-full mx-auto flex flex-col">
      <div className="h-[600px] flex flex-col-reverse gap-4 md:h-96 md:flex-row items-center justify-center">
        <SliderImg />
        <MainTelBanner />
      </div>
      <Card />
      <Ask />
    </div>
  );
}
