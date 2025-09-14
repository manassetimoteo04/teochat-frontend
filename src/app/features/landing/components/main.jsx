import FeaturesSection from "./features-section";
import HowWorksSection from "./how-works-section";
import WhatWeSolveSection from "./what-we-solve-section";
import BenefitsSection from "./benefits-section";
import MetricStatsSection from "./metric-stats-section";
import TestimonialsSection from "./testimonials-section";
import CtaSection from "./cta-section";
function Main() {
  return (
    <main className="flex flex-col  relative">
      <div className="max-w-[120rem] m-[0_auto] p-[2rem]   ">
        <div className="max-w-[120rem]   w-full overflow-hidden shadow-md rounded-[2rem] -translate-y-[15rem]  ">
          <img src="/image.png" className="w-full" />
        </div>
      </div>
      <FeaturesSection />
      <WhatWeSolveSection />
      <BenefitsSection />
      <MetricStatsSection />
      <TestimonialsSection />
      <CtaSection />
      {/* <HowWorksSection /> */}
    </main>
  );
}

export default Main;
