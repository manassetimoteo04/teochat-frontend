import clsx from "clsx";
import { MapPin, Video } from "lucide-react";
const weekdays = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const times = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
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
    const minute = Math.random() > 0.5 ? "00" : "30";

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

const events = generateEvents(30);
console.log(events);
function Schedule() {
  const list = [-3, -2, -1, 0, 1, 2, 3];
  const today = new Date(Date.now());
  const days = list.map((day) =>
    new Date(Date.now()).setDate(today.getDate() + day)
  );
  const dates = days.map((day) => new Date(day).toDateString());

  return (
    <div>
      <header className="p-[2rem] border-b">
        <p>18 de Ago 2025 &mdash; 24 de Ago 2025</p>
      </header>
      <div className="w-[calc(100dvw-30rem)]  overflow-x-scroll ">
        <div className="grid grid-cols-[8rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b">
          <div className="p-[1rem_2rem] text-[1.2rem] flex justify-center">
            <span>Horário</span>
          </div>
          {dates.map((date) => {
            const isToday =
              new Date(date).toDateString() === new Date().toDateString();
            return (
              <div
                key={date}
                className={clsx(
                  "p-[1rem_2rem] flex justify-center gap-[1rem] text-secondary-text-color items-center border-r",
                  isToday && "bg-gray-50"
                )}
              >
                <span className={isToday ? "text-main-text-color" : ""}>
                  {weekdays[new Date(date).getDay()]}
                </span>
                <span className={isToday ? "text-main-text-color" : ""}>
                  {new Date(date).getDate()}
                </span>
              </div>
            );
          })}
        </div>
        <div>
          {times.map((time) => (
            <ScheduleHour days={days} time={time} key={time} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScheduleHour({ time, days }) {
  return (
    <div className="border-b grid grid-cols-[8rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] after:absolute relative after:w-full after:h-[1px] after:border-b after:top-1/2 after:left-[7rem] after:border-dashed">
      <div className="w-[7rem] min-h-[14rem] text-[1.2rem] text-secondary-text-color flex items-center justify-center">
        {time}
      </div>
      <ScheduleDays days={days} time={time} />
    </div>
  );
}
function ScheduleDays({ days, time }) {
  return (
    <>
      {days.map((ev) => (
        <Day day={ev} key={ev} time={time} />
      ))}
    </>
  );
}
function Day({ day, time }) {
  const isToday = new Date(day).toDateString() === new Date().toDateString();
  const isNow = +time === new Date().getHours();
  const event = events.filter((ev) => {
    return (
      ev.time.startsWith(time.slice(0, 2)) &&
      new Date(ev.date).toDateString() === new Date(day).toDateString()
    );
  });

  return (
    <div
      className={clsx(
        "border-r-[1px] relative  border-gray-100",
        (isToday || isNow) && "bg-gray-50"
      )}
    >
      {event.map((ev) => (
        <Event event={ev} key={ev.id} />
      ))}
    </div>
  );
}
function Event({ event }) {
  const [startTime, startMin] = event?.time?.split(":") || [];
  const [endTime, endMin] = event?.end?.split(":") || [];
  let heights = "";
  let styles = {};
  if (startMin !== "00") heights = "top-1/2 ";
  if (startTime === endTime) {
    heights = heights + " h-full ";
  }
  if (+startTime < +endTime) {
    const diference = +endTime - +startTime;
    heights += ` !h-[${100 * diference}%]`;
    styles.height = `${100 * diference}%`;
  }
  return (
    <div
      style={styles}
      className={clsx(
        "w-full  absolute flex flex-col p-[0.5rem] rounded-2xl bg-blue-100",
        heights
      )}
    >
      <p className="truncate text-[1.4rem] text-blue-700">{event.title}</p>
      <span className="text-[1.2rem] text-secondary-text-color">
        {event.team}
      </span>
      <div className="flex gap-[0.5rem]">
        <span className="text-[1.2rem] text-secondary-text-color">
          {event.time}
        </span>
        <span className="text-[1.2rem] items-center flex gap-[0.3rem] text-secondary-text-color">
          {event.type}
          {event.type === "meeting" ? (
            <Video size={14} />
          ) : (
            <MapPin size={14} />
          )}
        </span>
      </div>
    </div>
  );
}
export default Schedule;
