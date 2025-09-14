import clsx from "clsx";
import { Link, useLocation, useParams } from "react-router-dom";
import { generateAvatar } from "../utils/helpers";

function NavCollapseLink({ link, to }) {
  const { teamId, companyId } = useParams();
  const path = useLocation().pathname;
  const currentId =
    teamId === link.id && path.startsWith(to.replace("app", companyId));
  const { color, initials } = generateAvatar(link.name);
  return (
    <Link
      to={to.replace("app", companyId) + "/" + link.id}
      className={clsx(
        currentId && "text-main-text-color",
        "hover:text-main-text-color flex items-center gap-[0.5rem] z-1 text-[1.4rem] after:absolute relative after:left-[1rem] after:top-[-2.2rem] after:rounded-br-none after:rounded-xl after:w-[1.5rem] after:border-b-[1.8px] after:border-l-[1.8px] after:border-gray-300 after:rounded-t-none after:h-[3.5rem] pl-[3rem] cursor-pointer"
      )}
    >
      <div
        style={{ backgroundColor: color }}
        className="w-[2rem] h-[2rem] text-main-text-color  text-[1rem] rounded-full flex items-center justify-center"
      >
        {initials}
      </div>
      {/* <img
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${link.name}`;
        }}
        src={link.photo}
        alt=""
        className="w-[2rem] h-[2rem] rounded-full"
      /> */}
      <span key={link.to}>{link.name}</span>
    </Link>
  );
}

export default NavCollapseLink;
