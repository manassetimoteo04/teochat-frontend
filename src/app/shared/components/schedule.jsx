import clsx from "clsx";
const weekdays = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const times = Array.from(
  { length: 24 },
  (_, i) => String(i).padStart(2, "0") + ":00"
);
export const events = [
  {
    id: "9b2fc0c0-5d31-41f5-8ae0-9dc99f4323a1",
    title: "Reunião de Estratégia",
    team: "Marketing Team",
    date: "2025-08-21",
    time: "09:30",
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
    end: "10:30",
    type: "meeting",
    status: "Confirmado",
    createdBy: "Recepcionista Carla",
  },
  {
    id: "fb948b6e-3389-4e80-ae65-038d1bd0e4b7",
    title: "Meeting com o director",
    team: "Dra. Ana Oliveira",
    date: "2025-08-22",
    time: "14:30",
    end: "15:30",
    type: "presencial",
    status: "Finalizado",
    createdBy: "Administração",
  },
  //   {
  //     id: "c48ad682-f52e-4fd1-9279-80cf780fd127",
  //     title: "Larissa Costa",
  //     team: "Dr. Pedro Lima",
  //     date: "2025-08-13",

  //     time: "16:30",
  //     type: "Exame de acuidade",
  //     status: "Cancelado",
  //     createdBy: "Recepcionista João",
  //   },
  //   {
  //     id: "f153a0e5-4828-4c4f-b1f8-e0ef9d5a6f5f",
  //     title: "Felipe Andrade",
  //     team: "Dra. Ana Oliveira",
  //     date: "2025-08-15",
  //     time: "11:30",
  //     type: "Consulta de rotina",
  //     status: "Confirmado",
  //     createdBy: "Recepcionista Carla",
  //   },
  //   {
  //     id: "2eb20b45-b4fc-4bcf-bc5f-3400a203d349",
  //     title: "Bruna Souza",
  //     team: "Dr. Pedro Lima",
  //     date: "2025-08-15",
  //     time: "15:30",
  //     type: "Consulta de lente de contato",
  //     status: "Pendente",
  //     createdBy: "Recepcionista João",
  //   },
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
      <div className="w-[calc(100dvw-30rem)] mb-[60rem] overflow-x-scroll ">
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
  console.log(time.slice(0, 2));

  return (
    <>
      {days.map((ev) => (
        <Day day={ev} key={ev} time={time} />
      ))}
    </>
  );
}
function Day({ day, time }) {
  const event = events.filter((ev) => {
    return (
      ev.time.startsWith(time.slice(0, 2)) &&
      new Date(ev.date).toDateString() === new Date(day).toDateString()
    );
  });
  return (
    <div className="border-x">
      {event.map((ev) => (
        <span>{ev.title}</span>
      ))}
    </div>
  );
}
export default Schedule;
