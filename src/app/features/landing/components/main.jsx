import FeaturesSection from "./features-section";
import HowWorksSection from "./how-works-section";
import WhatWeSolveSection from "./what-we-solve-section";
function Main() {
  return (
    <div className="max-w-[120rem]  m-[0_auto] flex flex-col gap-[16rem] relative">
      <div className=" w-full overflow-hidden shadow-md rounded-[2rem] -translate-y-[15rem]  ">
        <img src="./image2.png" className="w-full" />
      </div>
      <WhatWeSolveSection />
      <FeaturesSection />
      <HowWorksSection />
    </div>
  );
}

export default Main;
