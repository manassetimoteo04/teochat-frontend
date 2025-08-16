import Heading from "../ui/heading";
import { Clock, TrendingUp, Lightbulb } from "lucide-react";

const impactData = [
  {
    icon: <Clock />,
    title: "45% menos tempo gasto em reuniões semanais.",
  },
  {
    icon: <TrendingUp />,
    title: "+60% de engajamento da equipe.",
  },
  {
    icon: <Lightbulb />,
    title: "90% das equipes relataram melhor alinhamento.",
  },
];

function MetricStatsSection() {
  return (
    <section className="pb-[16rem]">
      <Heading isCenter={true}>O impacto do TeoChat nas Empresas</Heading>
      <div
        className="relative w-full mt-[6rem]
  bg-[url('./img-3.jpg')] h-[20rem] bg-cover bg-center"
      >
        <div
          className="absolute inset-0 
    bg-gradient-to-t from-black/80 to-transparent 
    backdrop-blur-[2rem]"
        >
          <div className="max-w-[120rem] h-full relative m-[0_auto]">
            <div className=" h-full  items-center flex text-white ">
              {impactData.map((data) => (
                <div
                  key={data.title}
                  className="w-[fit-content] flex flex-col gap-[1rem]"
                >
                  {data.icon}
                  <h4 className="text-[2rem]">{data.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MetricStatsSection;
