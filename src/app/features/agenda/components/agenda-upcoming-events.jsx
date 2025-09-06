import Heading from "../../../shared/ui/heading";

function AgendaUpcomingEvents() {
  return (
    <aside className="bg-main-bg-color-2 p-[2rem] border-gray-100 border rounded-3xl ">
      <Heading as="h4">Próximos eventos</Heading>
      <ul className="space-y-3">
        <li className="p-3 bg-white rounded-lg shadow-sm">
          <p className="font-medium">Reunião de Planejamento</p>
          <span className="text-sm text-gray-500">Hoje - 15:00</span>
        </li>
        <li className="p-3 bg-white rounded-lg shadow-sm">
          <p className="font-medium">Deadline Projeto X</p>
          <span className="text-sm text-gray-500">Amanhã - 12:00</span>
        </li>
        <li className="p-3 bg-white rounded-lg shadow-sm">
          <p className="font-medium">Revisão Sprint</p>
          <span className="text-sm text-gray-500">Sexta - 10:00</span>
        </li>
      </ul>
    </aside>
  );
}

export default AgendaUpcomingEvents;
