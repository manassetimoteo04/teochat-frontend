import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { Link } from "react-router-dom";
import NavLink from "../ui/NavLink";

function Nav() {
  return (
    <nav>
      <ul className="">
        <li>
          <NavLink to="conversations" />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
