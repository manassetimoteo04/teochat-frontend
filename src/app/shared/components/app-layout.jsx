import Header from "./header";
import Main from "./main";
import Sidebar from "./sidebar";

function AppLayout() {
  return (
    <div className="grid grid-cols-[30rem_1fr] max-w-[180rem] border-x mx-auto grid-rows-[5.5rem_1fr] h-[100dvh]">
      <Sidebar />
      <Main />
      <Header />
    </div>
  );
}

export default AppLayout;
