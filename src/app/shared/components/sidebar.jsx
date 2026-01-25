import { ListMinusIcon } from "lucide-react";
import ButtonIcon from "../ui/button-icon";
import Logo from "../ui/logo";
import Nav from "./nav";
import clsx from "clsx";
import { useOutsideClick } from "../hooks/use-outsideclick";

function Sidebar({ sidebar, setSidebar }) {
  const ref = useOutsideClick(() => setSidebar(false), true);
  return (
    <aside
      ref={ref}
      className={clsx(
        " absolute top-0 left-0 w-[90%]    z-10            lg:w-full translate-x-[-100%] lg:translate-x-0",
        sidebar && "translate-x-0",
        "lg:relative w-full",
        " h-screen bg-white border-gray-100 border-r grid grid-rows-[5.5rem_1fr] row-[1/-1]",
      )}
    >
      <div className="p-[1rem_2rem] text-secondary-text-color h-full border-gray-100   flex items-center justify-between">
        <Logo />
        <ButtonIcon onClick={() => setSidebar(false)}>
          <ListMinusIcon />
        </ButtonIcon>
      </div>
      <Nav />
    </aside>
  );
}

export default Sidebar;
