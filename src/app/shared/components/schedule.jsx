import clsx from "clsx";
import { MapPin, Video } from "lucide-react";
const weekdays = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const times = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const events = [
  {
    id: "9b2fc0c0-5d31-41f5-8ae0-9dc99f4323a1",
    title: "Reunião Diária",
    team: "Marketing Team",
    date: "2025-08-21",
    time: "09:00",
    end: "10:30",
    type: "meeting",
    status: "Pendente",
    createdBy: "Recepcionista Carla",
  },
  {
    id: "e1b1b63f-770b-49fa-bc70-54197b4f2dc6",
    title: "Reunião Semanal",
    team: "Dr. Pedro Lima",
    date: "2025-08-21",
    time: "11:30",
    end: "14:30",
    type: "meeting",
    status: "Confirmado",
    createdBy: "Recepcionista Carla",
  },
  {
    id: "fb948b6e-3389-4e80-ae65-038d1bd0e4b7",
    title: "Meeting director",
    team: "Dra. Ana Oliveira",
    date: "2025-08-22",
    time: "14:00",
    end: "15:30",
    type: "presencial",
    status: "Finalizado",
    createdBy: "Administração",
  },
  {
    id: "c48ad682-f52e-4fd1-9279-80cf780fd127",
    title: "Organizar aniv.",
    team: "Marketing",
    date: "2025-08-19",
    time: "07:00",
    end: "11:30",
    type: "meeting",
    status: "Cancelado",
    createdBy: "Recepcionista João",
  },
  {
    id: "f153a0e5-4828-4c4f-b1f8-e0ef9d5a6f5f",
    title: "Reunião Semanal",
    team: "GRH",
    date: "2025-08-20",
    time: "11:30",
    end: "12:30",
    type: "presencial",
    status: "Confirmado",
    createdBy: "Recepcionista Carla",
  },
  {
    id: "2eb20b45-b4fc-4bcf-bc5f-3400a203d349",
    title: "Contabilidade Geral",
    team: "Dr. Pedro Lima",
    date: "2025-08-22",
    time: "12:00",
    end: "14:30",
    type: "presencial",
    status: "Pendente",
    createdBy: "Recepcionista João",
  },
  //   {
  //     id: "a3f8d340-bb60-43f1-83a3-bb8a5eb1a22b",
  //     title: "Tiago Nascimento",
  //     team: "Dra. Ana Oliveira",
  //     date: "2025-08-16",
  //     time: "09:30",
  //     type: "Exame de acuidade",
  //     status: "Confirmado",
  //     createdBy: "Administração",
  //   },
  //   {
  //     id: "1c6368f7-0628-44b8-a590-7cf2a8f5e6a6",
  //     title: "Isabela Rocha",
  //     team: "Dr. Pedro Lima",
  //     date: "2025-08-17",
  //     time: "13:30",
  //     type: "Retorno",
  //     status: "Finalizado",
  //     createdBy: "Recepcionista Carla",
  //   },
];

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
