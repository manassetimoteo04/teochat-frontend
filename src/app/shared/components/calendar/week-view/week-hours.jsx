import WeekDays from "./week-days";

function WeekHours({ time, days, events }) {
  return (
    <div className="border-b grid grid-cols-[8rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] after:absolute relative after:w-full after:h-[1px] after:border-b after:top-1/2 after:left-[7rem] after:border-dashed">
      <div className="w-[7rem] min-h-[14rem] text-[1.2rem] text-secondary-text-color flex items-center justify-center">
        {time}
      </div>
      {days.map((ev) => (
        <WeekDays events={events} day={ev} key={ev} time={time} />
      ))}
    </div>
  );
}

export default WeekHours;
