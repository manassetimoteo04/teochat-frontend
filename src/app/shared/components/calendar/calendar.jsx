import {
  Calendar1Icon,
  CalendarDays,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ButtonIcon from "../../ui/button-icon";
import { useState } from "react";
import WeekView from "./week-view/week-view";
import { DayView } from "./day-view/day-view";
import MonthView from "./month-view/month-view";
import { useCalendar } from "./calendar-provider";
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

export const events = generateEvents(100);

function Calendar() {
  const { title, currentView, setCurrentView, ...rest } = useCalendar();
  const handlers = { ...rest };
  return (
    <div>
      <header className="p-[2rem] justify-between flex border-b">
        <div>
          <ButtonIcon title="Anterior" onClick={handlers[currentView]?.prev}>
            <ChevronLeft />
          </ButtonIcon>
          <ButtonIcon title="Próximo" onClick={handlers[currentView]?.next}>
            <ChevronRight />
          </ButtonIcon>
        </div>
        <p>{title}</p>
        <div className="flex gap-[1rem]">
          <ButtonIcon
            active={currentView === "day"}
            title="Visualizar Dia"
            onClick={() => setCurrentView("day")}
          >
            <Calendar1Icon />
          </ButtonIcon>
          <ButtonIcon
            active={currentView === "week"}
            title="Visualizar semana"
            onClick={() => setCurrentView("week")}
          >
            <CalendarRange />
          </ButtonIcon>
          <ButtonIcon
            active={currentView === "month"}
            title="Visualizar mês"
            onClick={() => setCurrentView("month")}
          >
            <CalendarDays />
          </ButtonIcon>
        </div>
      </header>
      {currentView === "week" && <WeekView />}
      {currentView === "day" && <DayView />}
      {currentView === "month" && <MonthView />}
    </div>
  );
}

export default Calendar;
