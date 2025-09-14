import { Outlet } from "react-router-dom";

function Main() {
  return (
    <main className="row-start-2 bg-[#f9fafb] h-[calc(100dvh - 6rem)] overflow-y-scroll col-span-2 ">
      <Outlet />
    </main>
  );
}

export default Main;
