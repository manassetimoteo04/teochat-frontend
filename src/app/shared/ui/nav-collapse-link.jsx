import clsx from "clsx";
import { Link, useLocation, useParams } from "react-router-dom";

function NavCollapseLink({ link, to }) {
  const { teamId } = useParams();
  const path = useLocation().pathname;
  const currentId = teamId === link._id && path.startsWith(to);
  return (
    <Link
      to={to + "/" + link._id}
      className={clsx(
        currentId && "text-main-text-color after:border-main-text-color z-1",
        "hover:text-main-text-color flex items-center gap-[0.5rem]  text-[1.4rem] after:absolute relative after:left-[1rem] after:top-[-2.2rem] after:rounded-br-none after:rounded-xl after:w-[1.5rem] after:border-b-[1.8px] after:border-l-[1.8px] after:border-gray-300 after:rounded-t-none after:h-[3.5rem] pl-[3rem] cursor-pointer"
      )}
    >
      <img src={link.photo} alt="" className="w-[2rem] h-[2rem] rounded-full" />
      <span key={link.to}>{link.name}</span>
    </Link>
  );
}

export default NavCollapseLink;
