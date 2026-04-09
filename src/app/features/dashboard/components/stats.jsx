import { useDashboardStats } from "../hooks/use-dashboard-stats";
import StatBox from "../ui/stat-box";
import { useAppContext } from "../../../shared/providers/context";

function Stats() {
  const { currentRole, currentUser } = useAppContext();
  const stats = useDashboardStats({
    currentRole,
    currentUserId: currentUser?.id,
  });
  return (
    <div className="grid mx-[2rem] overflow-hidden gap-[2rem] rounded-xl  border-main-border-color grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {stats?.map((stat) => (
        <StatBox key={stat.title} stat={stat} />
      ))}
    </div>
  );
}

export default Stats;
