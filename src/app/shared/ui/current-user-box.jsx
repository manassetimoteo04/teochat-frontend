import { ChevronDown } from "lucide-react";
import { useAppContext } from "../providers/context/";
import { rewriteRoles } from "../utils/helpers";
function CurrentUserBox() {
  const { currentUser, currentRole } = useAppContext();
  return (
    <div className="flex items-center gap-[0.5rem]">
      <img
        src={currentUser?.avatar || "/default-user.jpg"}
        onError={() => "/default-user.jpg"}
        className="w-[3.5rem] overflow-hidden h-[3.5rem] border-[2px] border-main-color rounded-full"
        alt={currentUser?.name}
      />
      <div className="flex flex-col gap-0">
        <p className="text-[1.4rem] text-main-text-color">
          {currentUser?.name}
        </p>
        <div className="flex justify-between">
          <span className="text-[1.2rem]">{rewriteRoles(currentRole)}</span>
          <span className="text-[1.2rem]">
            <ChevronDown size={18} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default CurrentUserBox;
