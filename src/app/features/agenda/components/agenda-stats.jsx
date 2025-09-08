import { useAgendaStats } from "../hooks/use-agenda-stats";
import AgendaStatBox from "../ui/agenda-stat-box";

function AgendaStats() {
  const stats = useAgendaStats();
  return (
    <div className="grid mx-[2rem] overflow-hidden gap-[2rem] rounded-xl  border-main-border-color grid-cols-2 ">
      {stats.map((stat) => (
        <AgendaStatBox key={stat.title} stat={stat} />
      ))}
    </div>
  );
}

export default AgendaStats;
