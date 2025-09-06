import { Calendar1Icon, CalendarDays, CalendarRange } from "lucide-react";
import ButtonIcon from "../../ui/button-icon";
import { useState } from "react";
import WeekView from "./week-view/week-view";
import { DayView } from "./day-view/day-view";
function addDays(base, days) {
  const date = new Date(base);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEvents(count = 20) {
  const now = new Date();

  const titles = [
    "Reunião de Planejamento",
    "Treinamento Técnico",
    "Workshop de Marketing",
    "Avaliação de Projeto",
    "Reunião com Cliente",
    "Reunião Final de Sprint",
    "Treinamento Segurança",
    "Reunião Semanal",
    "Sessão de Feedback",
    "Brainstorm Criativo",
  ];

  const teams = [
    "Equipe de Produto",
    "TI",
    "Marketing",
    "Direção",
    "Comercial",
    "Dev Team",
    "Operações",
    "Equipe de Design",
  ];

  const statuses = ["Confirmado", "Pendente", "Finalizado"];
  const types = ["meeting", "presencial"];
  const creators = [
    "Administração",
    "Scrum Master",
    "Recursos Humanos",
    "Recepcionista Carla",
    "Recepcionista João",
    "Vendas",
    "RH",
  ];

  const events = [];

  for (let i = 0; i < count; i++) {
    const offset = Math.floor(Math.random() * (30 + 7 + 1)) - 7;

    const hour = 8 + Math.floor(Math.random() * 10);
    const minute = Math.floor(Math.random() * 59) + 1;

    const startTime = `${hour.toString().padStart(2, "0")}:${minute}`;
    const endTime = `${(hour + 1).toString().padStart(2, "0")}:${minute}`;

    events.push({
      id: crypto.randomUUID(),
      title: randomChoice(titles),
      team: randomChoice(teams),
      date: addDays(now, offset),
      time: startTime,
      end: endTime,
      type: randomChoice(types),
      status: randomChoice(statuses),
      createdBy: randomChoice(creators),
    });
  }

  return events;
}

const events = generateEvents(100);

function Calendar() {
  const [title, setTitle] = useState("");
  const [view, setView] = useState("week-view");

  return (
    <div>
      <header className="p-[2rem] justify-between flex border-b">
        <p>{title}</p>
        <div className="flex gap-[1rem]">
          <ButtonIcon
            title="Visualizar Dia"
            onClick={() => setView("day-view")}
          >
            <Calendar1Icon />
          </ButtonIcon>
          <ButtonIcon
            title="Visualizar semana"
            onClick={() => setView("week-view")}
          >
            <CalendarRange />
          </ButtonIcon>
          <ButtonIcon
            title="Visualizar mês"
            onClick={() => setView("month-view")}
          >
            <CalendarDays />
          </ButtonIcon>
        </div>
      </header>
      {view === "week-view" && <WeekView events={events} setTitle={setTitle} />}
      {view === "day-view" && <DayView events={events} setTitle={setTitle} />}
    </div>
  );
}

export default Calendar;
