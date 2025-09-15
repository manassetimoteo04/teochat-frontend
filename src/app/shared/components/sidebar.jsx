import Logo from "../ui/logo";
import Nav from "./nav";

function Sidebar() {
  return (
    <aside className=" border-gray-100 border-r grid grid-rows-[5.5rem_1fr] row-[1/-1]">
      <div className="p-[1rem_2rem] text-secondary-text-color h-full border-gray-100   flex items-center justify-between">
        <Logo />
      </div>
      <Nav />
    </aside>
  );
}

export default Sidebar;
