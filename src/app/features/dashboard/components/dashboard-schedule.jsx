import Schedule from "../../../shared/components/schedule";

function DashboardSchedule() {
  return (
    <div className="bg-white border-t border-gray-100 mt-[3rem] h-full">
      <header className="p-[2rem]">
        <h3>Agenda Completa</h3>
      </header>
      <Schedule />
    </div>
  );
}

export default DashboardSchedule;
