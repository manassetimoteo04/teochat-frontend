import {
<<<<<<< HEAD
  HiOutlineChatBubbleLeft,
  HiOutlineCog,
  HiOutlinePhone,
=======
  HiChatBubbleLeft,
  HiCog6Tooth,
  HiOutlineChatBubbleLeft,
  HiOutlineCog6Tooth,
  HiOutlinePhone,
  HiPhone,
>>>>>>> 26a9d0f (primeiro commit)
} from "react-icons/hi2";
import NavLink from "../ui/NavLink";

function Nav() {
  return (
    <nav className="w-full ">
<<<<<<< HEAD
      <ul className="w-full flex flex-col items-center  justify-center p-[1rem]">
        <li className="w-full   flex-col flex items-center">
          <NavLink to="conversations" icon={<HiOutlineChatBubbleLeft />} />
        </li>
        <li className="w-full  flex-col   flex items-center">
          <NavLink to="calls" icon={<HiOutlinePhone />} />
        </li>
        <li className="w-full   flex-col  flex items-center">
          <NavLink to="conversations" icon={<HiOutlineCog />} />
=======
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
>>>>>>> 26a9d0f (primeiro commit)
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
