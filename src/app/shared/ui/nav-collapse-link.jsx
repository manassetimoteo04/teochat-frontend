import { useNavigate } from "react-router-dom";

function NavCollapseLink({ link }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(link.to)}
      className="hover:text-main-text-color flex items-center gap-[0.5rem] text-[1.4rem] after:absolute relative after:left-[0.8rem] after:top-[-2.2rem] after:rounded-br-none after:rounded-xl after:w-[1.5rem] after:border-b-[1.8px] after:border-l-[1.8px] after:border-gray-300 after:rounded-t-none after:h-[3.5rem] pl-[2.5rem] cursor-pointer"
    >
      <img src="/default-user.jpg" alt="" className="w-[2rem]" />
      <span key={link.to}>{link.title}</span>
    </div>
  );
}

export default NavCollapseLink;
