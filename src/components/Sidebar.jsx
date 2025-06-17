import { HiUser } from "react-icons/hi";
import Logo from "../ui/Logo";
import Nav from "./Nav";

function Sidebar() {
  return (
    <aside className="border-r-[1px] border-[#DCDCDC] flex flex-col justify-between items-center p-[2rem_1rem]">
      <Logo />
      <Nav />
      <div>
        <HiUser />
      </div>
    </aside>
  );
}

export default Sidebar;
