import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

import { useAppContext } from "../providers/context";
import { generateAvatar, rewriteRoles } from "../utils/helpers";

function CurrentUserBox() {
  const { currentUser, currentRole, logout } = useAppContext();

  const { initials, color } = generateAvatar(currentUser?.name);

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleOutside);

    return () => {
      document.removeEventListener("click", handleOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="
          flex items-center gap-[1rem]
          rounded-2xl px-[1rem] py-[0.8rem]
          hover:bg-gray-50 transition
        "
      >
        <div
          className="
    h-[3.8rem] w-[3.8rem]
    rounded-full overflow-hidden
    border shrink-0
  "
        >
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser?.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              style={{ backgroundColor: color }}
              className="
        h-full w-full
        flex items-center justify-center
        font-medium text-main-text-color
      "
            >
              {initials}
            </div>
          )}
        </div>
        <div className="hidden md:flex flex-col items-start leading-tight">
          <p className="text-[1.4rem] text-main-text-color font-medium">
            {currentUser?.name}
          </p>

          <span className="text-[1.2rem] text-secondary-text-color">
            {rewriteRoles(currentRole)}
          </span>
        </div>

        <ChevronDown
          size={18}
          className={`
            hidden md:block transition
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && (
        <div
          className="
            absolute r  right-0 top-[calc(100%+1rem)]
            min-w-[24rem]
            rounded-2xl border border-gray-100
            bg-white shadow-xl p-[0.8rem]
            z-50
          "
        >
          <div className="px-[1rem] py-[1rem] border-b mb-[0.6rem]">
            <p className="text-[1.4rem] font-medium">{currentUser?.name}</p>

            <p className="text-[1.2rem] text-secondary-text-color">
              {currentUser?.email}
            </p>
          </div>

          <button
            className="
              w-full flex items-center gap-[1rem]
              rounded-xl px-[1rem] py-[1rem]
              hover:bg-gray-50 transition
            "
          >
            <Settings size={18} />
            <span>Configurações</span>
          </button>

          <div className="my-[0.6rem] border-t" />

          <button
            onClick={logout}
            className="
              w-full flex items-center gap-[1rem]
              rounded-xl px-[1rem] py-[1rem]
              text-red-600 hover:bg-red-50 transition
            "
          >
            <LogOut size={18} />
            <span>Terminar sessão</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default CurrentUserBox;
