import { NavListItems } from "../constants";
import CurrentCompany from "../ui/current-company";
import NavLink from "../ui/nav-link";
import { LogOut } from "lucide-react";
import SpinnerMini from "../ui/SpinnerMini";
import { useLogout } from "../../features/authentication/hooks/use-logout";

function Nav({ setSidebar }) {
  const { logout, isPending } = useLogout();

  return (
    <nav className="p-[2rem]  flex flex-col gap-[3rem] justify-between overflow-scroll  h-[calc(100dvh - 5.5rem]">
      <ul className="flex flex-col gap-[0.5rem]">
        {NavListItems.map((link) => (
          <NavLink setSidebar={setSidebar} key={link.title} link={link} />
        ))}
      </ul>
      <div className="flex flex-col gap-[1rem]">
        <CurrentCompany />
        <button
          onClick={() => logout()}
          disabled={isPending}
          className="flex items-center justify-center gap-[0.8rem] p-[1.2rem] rounded-3xl border border-gray-200 text-secondary-text-color hover:text-main-text-color hover:bg-gray-50 disabled:opacity-60"
        >
          {isPending ? <SpinnerMini /> : <LogOut size={18} />}
          <span>Terminar sessão</span>
        </button>
      </div>
    </nav>
  );
}

export default Nav;
