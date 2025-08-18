import Nav from "./nav";

function Sidebar() {
  return (
    <aside className=" border-gray-100 border-r grid grid-rows-[5.5rem_1fr] row-[1/-1]">
      <div className="p-[1rem_2rem] text-secondary-text-color h-full border-gray-100  border-b flex items-center justify-between">
        <h1 className="flex gap-1 items-center sm:text-[1.8rem] text-main-text-color relative">
          <img
            src="/logo.png"
            alt="TeoChat Logo"
            className="sm:w-[3rem] w-[2rem] h-auto"
          />
          TeoChat
        </h1>
      </div>
      <Nav />
    </aside>
  );
}

export default Sidebar;
