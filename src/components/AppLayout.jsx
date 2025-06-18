import ConversationList from "./ConversationList";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[8rem_40rem_1fr] bg-[#F1F1F1]">
      <Sidebar />
      <ConversationList />
      <div>Selec</div>
    </div>
  );
}

export default AppLayout;
