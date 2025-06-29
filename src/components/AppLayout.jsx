<<<<<<< HEAD
import ConversationList from "./ConversationList";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[8rem_40rem_1fr] bg-[#F1F1F1]">
      <Sidebar />
      <ConversationList />
      <div>Selec</div>
=======
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useCurrentConversation } from "../contexts/ConversationContextProvider";
import clsx from "clsx";

function AppLayout() {
  const { conversationDetails } = useCurrentConversation();
  return (
    <div
      className={`grid h-screen grid-cols-1 my-0 mx-auto max-w-[200rem] sm:grid-cols-[6rem_1fr] bg-[#F1F1F1] md:grid-cols-[6rem_1fr_1fr] ${
        conversationDetails
          ? clsx`lg:grid-cols-[6rem_1fr_1fr_1fr]`
          : clsx`lg:grid-cols-[6rem_45rem_1fr]`
      }`}
    >
      <Sidebar />
      <Outlet />
>>>>>>> 26a9d0f (primeiro commit)
    </div>
  );
}

export default AppLayout;
