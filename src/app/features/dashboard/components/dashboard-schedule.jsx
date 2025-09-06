import Calendar from "../../../shared/components/calendar/calendar";

function DashboardSchedule() {
  return (
    <div className="bg-white border-t border-gray-100 mt-[3rem] h-full">
      <header className="p-[2rem]">
        <h3>Agenda Completa</h3>
      </header>
      <Calendar />
    </div>
  );
}

export default DashboardSchedule;
