<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { NavLink as Link } from "react-router-dom";
>>>>>>> 26a9d0f (primeiro commit)

function NavLink({ to = "", icon }) {
  return (
    <Link
      to={to}
<<<<<<< HEAD
      className=" text-[2.4rem] w-[5rem] rounded-[0.5rem] text-gray-500 transition-all hover:duration-[0.3s] hover:text-gray-700 h-[5rem] flex items-center justify-center  hover:bg-gray-200"
    >
      {icon}
=======
      className=" text-[2.4rem]  text-secondary-text-color dark:text-secondary-text-color-dark  rounded-[0.5rem]  transition-all 0  flex flex-col items-center justify-center "
    >
      {({ isActive }) => icon(isActive)}
>>>>>>> 26a9d0f (primeiro commit)
    </Link>
  );
}

export default NavLink;
