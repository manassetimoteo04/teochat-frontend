import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[5rem_30rem_1fr] bg-[#F1F1F1]">
      <Sidebar />
      <div className="bg-white">Main</div>
      <div>Main</div>
    </div>
  );
}

export default AppLayout;
