import {
  Calendar1Icon,
  CalendarDays,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ButtonIcon from "../../ui/button-icon";
import { useEffect, useState } from "react";
import WeekView from "./week-view/week-view";
import { DayView } from "./day-view/day-view";
import MonthView from "./month-view/month-view";
import { useCalendar } from "./calendar-provider";
import { createMany } from "../../../features/events/services/event-services";
function generateEvents(count = 20) {
  const now = new Date();

  const titles = [
    "Reunião de Planejamento",
    "Treinamento Técnico",
    "Workshop de Marketing",
    "Avaliação de Projeto",
    "Reunião com Cliente",
    "Reunião Final de Sprint",
    "Treinamento de Segurança",
    "Reunião Semanal",
    "Sessão de Feedback",
    "Brainstorm Criativo",
    "Apresentação de Resultados",
    "Definição de Estratégia",
    "Treinamento de Onboarding",
    "Alinhamento de Metas",
    "Workshop de Design Thinking",
    "Retrospectiva de Sprint",
    "Revisão de Código",
    "Palestra Motivacional",
    "Planejamento de Campanha",
    "Revisão de OKRs",
    "Demonstração de Produto",
    "Sessão de Integração",
    "Treinamento de Liderança",
    "Reunião de Crise",
    "Workshop de Vendas",
    "Hackathon Interno",
    "Alinhamento de Roadmap",
    "Sessão de Inovação",
    "Reunião de Resultados Financeiros",
    "Debate Estratégico",
    "Treinamento de Soft Skills",
    "Sessão de Mentoria",
    "Planejamento Orçamentário",
    "Apresentação para Investidores",
    "Oficina de UX/UI",
    "Reunião de Governança",
    "Sessão de Cultura Organizacional",
    "Treinamento em Ferramentas Ágeis",
    "Alinhamento Interdepartamental",
    "Revisão de Propostas",
    "Sessão de Ideação",
    "Treinamento em Compliance",
    "Encontro Anual da Empresa",
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
    "Financeiro",
    "RH",
    "Suporte ao Cliente",
    "Equipe de Pesquisa",
    "Jurídico",
    "Equipe de Vendas",
    "Equipe de Estratégia",
    "Equipe de Inovação",
    "Equipe de Dados",
  ];

  const statuses = ["pending", "active", "canceled", "finished"];
  const types = ["presential", "video-call"];

  const locations = [
    "Sala 101 - Sede Principal",
    "Auditório Central",
    "Sala de Reuniões 2B",
    "Espaço Coworking - Andar 3",
    "Escritório Regional - Luanda",
    "Sala de Conferências Azul",
    "Hub de Inovação - Andar 5",
    "Sala 305 - Torre Empresarial",
    "Escritório Satélite - Lisboa",
    "Sala de Treinamento A",
  ];

  const descriptions = [
    "Um encontro detalhado para alinhar os próximos passos do projeto, garantindo que todos os membros entendam as prioridades e os objetivos principais.",
    "Sessão prática voltada para capacitar os colaboradores em novas ferramentas e metodologias, promovendo eficiência e inovação.",
    "Workshop colaborativo para explorar novas estratégias de marketing digital e offline, com foco em aumento de alcance e engajamento.",
    "Reunião para avaliar o andamento atual do projeto, identificar riscos e ajustar os planos conforme necessário.",
    "Encontro estratégico com cliente para apresentar propostas, esclarecer dúvidas e negociar próximos contratos.",
    "Discussão final de sprint para revisar entregas, resolver pendências e preparar a próxima iteração.",
    "Treinamento obrigatório para reforçar boas práticas de segurança digital e física dentro da organização.",
    "Reunião semanal para atualização de status de cada equipe, alinhamento de prioridades e identificação de bloqueios.",
    "Sessão estruturada para fornecer feedbacks construtivos, alinhando desempenho individual e coletivo.",
    "Brainstorm criativo para geração de ideias que possam impulsionar inovação em produtos e serviços.",
    "Apresentação dos resultados trimestrais para análise de desempenho e definição de ações corretivas.",
    "Encontro para definir estratégias de crescimento no mercado e reposicionamento da marca.",
    "Sessão de integração para novos colaboradores, apresentando a cultura, processos e equipes da empresa.",
    "Demonstração prática do novo produto para stakeholders e potenciais investidores.",
    "Sessão de mentoria entre líderes e novos talentos, promovendo aprendizado contínuo.",
    "Alinhamento financeiro e definição de prioridades de investimento para o próximo trimestre.",
    "Reunião de crise para definir respostas rápidas a imprevistos e alinhar comunicação.",
    "Treinamento focado no desenvolvimento de habilidades interpessoais e liderança.",
    "Encontro anual da empresa para alinhar visão, metas e celebrar conquistas.",
    "Sessão de inovação para explorar novas tecnologias aplicáveis ao negócio.",
  ];
  const teamsIDs = [
    "68c53a47c5ebdaca6e0b47d0",
    "68bcb8962d53bfa78eda010b",
    "68b74275c909a75829ff1224",
    "68c53a8bc5ebdaca6e0b4842",
  ];
  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function addDays(date, days) {
    const copy = new Date(date);
    copy.setDate(date.getDate() + days);
    return copy;
  }

  const events = [];

  for (let i = 0; i < count; i++) {
    const offset = Math.floor(Math.random() * (90 + 7 + 1)) - 7;
    const hour = 8 + Math.floor(Math.random() * 10);
    const minute = Math.floor(Math.random() * 59) + 1;

    const date = addDays(now, offset);
    const now2 = new Date(date);
    const startTime = new Date(now2.setHours(hour, minute));
    const endTime = new Date(now2.setHours(hour + 2, minute));

    const type = randomChoice(types);
    const event = {
      title: randomChoice(titles),
      team: randomChoice(teams),
      date,
      teamId: randomChoice(teamsIDs),
      companyId: "68b742d1f0dba02c466f6859",
      startTime,
      endTime,
      type,
      status: randomChoice(statuses),
      description: randomChoice(descriptions),
    };

    if (type === "presential") {
      event.location = randomChoice(locations);
    }

    events.push(event);
  }

  return events;
}

export const events = generateEvents(1240);
function Calendar() {
  const { title, currentView, setCurrentView, ...rest } = useCalendar();
  const handlers = { ...rest };
  // useEffect(() => {
  //   (async () => {
  //     await createMany(events);
  //   })();
  // }, []);
  return (
    <div>
      <div className="p-[2rem] sticky top-0 z-[100] left-0  !bg-white justify-between flex border-b">
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
      </div>
      {currentView === "week" && <WeekView />}
      {currentView === "day" && <DayView />}
      {currentView === "month" && <MonthView />}
    </div>
  );
}

export default Calendar;
