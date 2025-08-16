import FeaturesSection from "./features-section";
import HowWorksSection from "./how-works-section";
import WhatWeSolveSection from "./what-we-solve-section";
import BenefitsSection from "./benefits-section";
import MetricStatsSection from "./metric-stats-section";
function Main() {
  return (
    <div className="flex flex-col gap-[16rem] relative">
      <div className="max-w-[120rem] m-[0_auto] w-full overflow-hidden shadow-md rounded-[2rem] -translate-y-[15rem]  ">
        <img src="./image2.png" className="w-full" />
      </div>
      <FeaturesSection />
      <WhatWeSolveSection />
      <BenefitsSection />
      <MetricStatsSection />
      <HowWorksSection />
    </div>
  );
}

export default Main;
