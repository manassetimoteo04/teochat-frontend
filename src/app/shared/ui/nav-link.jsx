import { NavLink as Link, useLocation, useParams } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { useCompanyTeams } from "../../features/teams/hooks/use-company-teams";
import NavCollapseLink from "./nav-collapse-link";
function NavLink({ link }) {
  const isActive = useLocation().pathname.startsWith(link.to);
  const { data, isPending } = useCompanyTeams();
  const { companyId } = useParams();

  const [collapse, setCollapse] = useState(false);
  link.childs = data || [];
  const Component = !link.isCollapseble ? Link : "div";
  return (
    <li>
      <Component
        onClick={() => (link.isCollapseble ? setCollapse((s) => !s) : {})}
        to={link.isCollapseble ? "" : link.to.replace("app", companyId)}
        className={`${
          isActive ? "bg-gray-100 !text-main-text-color" : ""
        } flex p-[1.5rem] gap-[0.5rem] cursor-pointer text-secondary-text-color justify-between  active:bg-gray-50 hover:bg-gray-50 rounded-3xl`}
      >
        <span className="flex gap-[0.5rem] items-center">
          {link.icon} {link.title}
        </span>
        {link.isCollapseble && (
          <span>
            {collapse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </span>
        )}
      </Component>
      {collapse && link?.childs?.length > 0 && (
        <div
          className={`flex flex-col p-[1rem_1.5rem] gap-[0.5rem] text-secondary-text-color justify-between  rounded-3xl`}
        >
          {isPending && <span>Carrengando...</span>}
          {link.childs.map((child) => (
            <NavCollapseLink link={child} to={link.to} key={child.title} />
          ))}
        </div>
      )}
    </li>
  );
}

export default NavLink;
