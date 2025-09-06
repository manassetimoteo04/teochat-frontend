function MonthDay({ day }) {
  const date = new Date(day);
  return (
    <div className="h-28 border-b border-r  p-1 flex flex-col ">
      <span className="text-gray-500">{day.getDate()}</span>
      {/* <div className="mt-1 p-1 text-white bg-blue-500 rounded">Reunião</div> */}
      {/* <div className="mt-1 p-1 text-white bg-red-500 rounded">
              Deadline
            </div> */}
    </div>
  );
}

export default MonthDay;
