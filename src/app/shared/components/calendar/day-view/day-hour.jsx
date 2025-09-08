import Event from "../event";

export default function DayHour({ hour, left, events }) {
  return (
    <div className="  border-gray-200 relative min-h-[10rem] first:border-t  border-b grid grid-cols-[4rem_1fr] sm:grid-cols-[7rem_1fr] md:grid-cols-[8rem_1fr] ">
      <div className="content-center text-center border-r-1 text-text-secondary border-border-light  ">
        <span className="text-[1rem] sm:text-[1.4rem]">{hour}</span>
      </div>
      <span className="absolute top-1/2 left-[7rem] w-full border-dashed h-0 border-t-[2px]"></span>
      <div className="relative mr-[2rem] ">
        <div>
          {events.map((event) => (
            <Event left={left} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
