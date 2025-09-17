import { useDashboardStats } from "../hooks/use-dashboard-stats";
import StatBox from "../ui/stat-box";

function Stats() {
  const stats = useDashboardStats();
  return (
    <div className="grid mx-[2rem] overflow-hidden gap-[2rem] rounded-xl  border-main-border-color grid-cols-4 ">
      {stats?.map((stat) => (
        <StatBox key={stat.title} stat={stat} />
      ))}
    </div>
  );
}

export default Stats;
