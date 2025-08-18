import { Outlet } from "react-router-dom";

function Main() {
  return (
    <main className="row-start-2 col-span-2 ">
      <Outlet />
    </main>
  );
}

export default Main;
