import { BellIcon, ListMinusIcon } from "lucide-react";
import CurrentUserBox from "../ui/current-user-box";

function Header() {
  return (
    <header className="h-full flex justify-between items-center p-[0_2rem] text-secondary-text-color border-b border-gray-100">
      <button>
        <ListMinusIcon />
      </button>
      <div className="flex gap-[2rem] items-center">
        <button>
          <BellIcon size={20} />
        </button>
        <CurrentUserBox />
      </div>
    </header>
  );
}

export default Header;
