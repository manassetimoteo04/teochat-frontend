import {
  HiChatBubbleLeft,
  HiCog6Tooth,
  HiOutlineChatBubbleLeft,
  HiOutlineCog6Tooth,
  HiOutlinePhone,
  HiPhone,
} from "react-icons/hi2";
import NavLink from "../ui/NavLink";

function Nav() {
  return (
    <nav className="w-full ">
      <ul className="w-full gap-[3rem] flex sm:flex-col items-center  justify-between p-[1rem]">
        <li className="w-full   h-full  flex-col flex items-center">
          <NavLink
            to="/conversations"
            icon={(isActive) =>
              isActive ? <HiChatBubbleLeft /> : <HiOutlineChatBubbleLeft />
            }
          />
        </li>
        <li className="w-full flex-col flex items-center">
          <NavLink
            to="/calls"
            icon={(isActive) => (isActive ? <HiPhone /> : <HiOutlinePhone />)}
          />
        </li>
        <li className="w-full flex-col flex items-center">
          <NavLink
            to="/settings"
            icon={(isActive) =>
              isActive ? <HiCog6Tooth /> : <HiOutlineCog6Tooth />
            }
          />{" "}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
