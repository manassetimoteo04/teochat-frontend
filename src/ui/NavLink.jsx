import { NavLink as Link } from "react-router-dom";

function NavLink({ to = "", icon }) {
  return (
    <Link
      to={to}
      className=" text-[2.4rem]  text-secondary-text-color dark:text-secondary-text-color-dark  rounded-[0.5rem]  transition-all 0  flex flex-col items-center justify-center "
    >
      {({ isActive }) => icon(isActive)}
    </Link>
  );
}

export default NavLink;
