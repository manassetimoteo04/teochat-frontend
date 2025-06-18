import { HiOutlineLogout, HiUser } from "react-icons/hi";
import Logo from "../ui/Logo";
import Nav from "./Nav";
import ButtonIcon from "../ui/ButtonIcon";

function Sidebar() {
  return (
    <aside className="border-r-[1px] border-[#DCDCDC] flex flex-col justify-between items-center p-[2rem_0]">
      <Logo />
      <Nav />
      <ButtonIcon roudend="full">
        <HiOutlineLogout />
      </ButtonIcon>
    </aside>
  );
}

export default Sidebar;
