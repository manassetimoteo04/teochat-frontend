import { ListMinusIcon } from "lucide-react";
import CurrentUserBox from "../ui/current-user-box";
import clsx from "clsx";
import NotificationBell from "../../features/notifications/components/notification-bell";

function Header({ setSidebar }) {
  return (
    <header
      className={clsx(
        "absolute top-0 left-0 w-full h-[5.5rem]  lg:relative lg:h-full",
        "    flex justify-between items-center p-[0_2rem] text-secondary-text-color border-b border-gray-100",
      )}
    >
      <button
        onClick={() => {
          setSidebar(true);
        }}
      >
        <ListMinusIcon />
      </button>
      <div className="flex gap-[2rem] items-center">
        <NotificationBell />
        <CurrentUserBox />
      </div>
    </header>
  );
}

export default Header;
