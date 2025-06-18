import { Link } from "react-router-dom";

function NavLink({ to = "", icon }) {
  return (
    <Link
      to={to}
      className=" text-[2.4rem] w-[5rem] rounded-[0.5rem] text-gray-500 transition-all hover:duration-[0.3s] hover:text-gray-700 h-[5rem] flex items-center justify-center  hover:bg-gray-200"
    >
      {icon}
    </Link>
  );
}

export default NavLink;
