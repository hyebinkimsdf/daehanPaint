import { Gnb } from "./components/Gnb";
import { SliderImg } from "./components/SliderImg";

export default function Home() {
  return (
    <div>
      <Gnb />
      <div className="h-96">
        <SliderImg />
      </div>
    </div>
  );
}
