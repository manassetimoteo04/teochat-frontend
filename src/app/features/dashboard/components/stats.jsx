import { statsItems } from "../constants";
import StatBox from "../ui/stat-box";

function Stats() {
  return (
    <div className="grid mx-[2rem] rounded-xl border border-main-border-color grid-cols-4 ">
      {statsItems.map((stat) => (
        <StatBox key={stat.title} stat={stat} />
      ))}
    </div>
  );
}

export default Stats;
