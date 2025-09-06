import AgendaStatBox from "../ui/agenda-stat-box";
const statsItems = [
  {
    title: "Total Eventos",
    value: 120,
  },
  {
    title: "Eventos de Hoje",
    value: 14,
  },
  {
    title: "Eventos Próximos",
    value: 120,
  },
  {
    title: "Eventos Cancelados",
    value: "70",
  },
];
function AgendaStats() {
  return (
    <div className="grid mx-[2rem] overflow-hidden gap-[2rem] rounded-xl  border-main-border-color grid-cols-2 ">
      {statsItems.map((stat) => (
        <AgendaStatBox key={stat.title} stat={stat} />
      ))}
    </div>
  );
}

export default AgendaStats;
