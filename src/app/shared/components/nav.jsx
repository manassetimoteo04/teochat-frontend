import { NavListItems } from "../constants";
import CurrentCompany from "../ui/current-company";
import NavLink from "../ui/nav-link";
function Nav({ setSidebar }) {
  return (
    <nav className="p-[2rem]  flex flex-col gap-[3rem] justify-between overflow-scroll  h-[calc(100dvh - 5.5rem]">
      <ul className="flex flex-col gap-[0.5rem]">
        {NavListItems.map((link) => (
          <NavLink setSidebar={setSidebar} key={link.title} link={link} />
        ))}
      </ul>
      <CurrentCompany />
    </nav>
  );
}

export default Nav;
