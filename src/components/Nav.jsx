import {
  HiOutlineChatBubbleLeft,
  HiOutlineCog,
  HiOutlinePhone,
} from "react-icons/hi2";
import NavLink from "../ui/NavLink";

function Nav() {
  return (
    <nav className="w-full ">
      <ul className="w-full flex flex-col items-center  justify-center p-[1rem]">
        <li className="w-full   flex-col flex items-center">
          <NavLink to="conversations" icon={<HiOutlineChatBubbleLeft />} />
        </li>
        <li className="w-full  flex-col   flex items-center">
          <NavLink to="calls" icon={<HiOutlinePhone />} />
        </li>
        <li className="w-full   flex-col  flex items-center">
          <NavLink to="conversations" icon={<HiOutlineCog />} />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
