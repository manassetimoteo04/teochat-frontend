import { ChevronDown } from "lucide-react";
import { useAppContext } from "../providers/context/";
import { generateAvatar, rewriteRoles } from "../utils/helpers";
function CurrentUserBox() {
  const { currentUser, currentRole } = useAppContext();
  const { initials, color } = generateAvatar(currentUser?.name);
  return (
    <div className="flex w-ful  items-center gap-[0.5rem]">
      <div
        style={{ backgroundColor: color }}
        className="w-[3.5rem] text-main-text-color h-[3.5rem] border rounded-full flex items-center justify-center"
      >
        {initials}
      </div>
      <div className=" flex-col hidden md:flex gap-0">
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
