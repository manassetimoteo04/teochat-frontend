import clsx from "clsx";
import { useAgendaStats } from "../hooks/use-agenda-stats";
import AgendaStatBox from "../ui/agenda-stat-box";

function AgendaStats({ className }) {
  const stats = useAgendaStats();
  return (
    <div
      className={clsx(
        "grid overflow-hidden gap-[1.5rem] rounded-xl border-main-border-color grid-cols-2",
        className,
      )}
    >
      {stats.map((stat) => (
        <AgendaStatBox key={stat.title} stat={stat} />
      ))}
    </div>
  );
}

export default AgendaStats;
