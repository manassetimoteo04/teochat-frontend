import Logo from "../ui/Logo";
import Nav from "./Nav";
import ButtonIcon from "../ui/ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../contexts/DarkModeContext";

function Sidebar() {
  const { toggleDarkMode, isDarkMode } = useDarkMode();
  return (
    <aside className=" border-r-[1px] px-[2rem] bg-main-bg-color dark:border-main-border-color-dark dark:bg-main-bg-color-dark z-[99999] sm:relative sm:flex-col  sm:h-[100vh] sm:justify-between fixed bottom-0 left-0 w-full h-[6rem] flex-row  border-main-bor flex md:flex-col justify-between items-center p-[2rem_0]">
      <Logo />
      <Nav />
      <ButtonIcon onClick={toggleDarkMode} roudend="full" hidden="hidden">
        {isDarkMode && <HiOutlineSun />}
        {!isDarkMode && <HiOutlineMoon />}
      </ButtonIcon>
    </aside>
  );
}

export default Sidebar;
