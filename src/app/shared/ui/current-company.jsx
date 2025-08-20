import { ChevronRight } from "lucide-react";
import { rewriteRoles } from "../../utils/helpers";
import { useAppContext } from "../providers/context";
import { useNavigate } from "react-router-dom";
function CurrentCompany() {
  const { currentCompany, currentRole } = useAppContext();
  const navigate = useNavigate();
  return (
    <div className="p-[1rem] relative shadow-sm bg-gray-50 border border-gray-200 text-secondary-text-color rounded-3xl    grid grid-cols-[4rem_1fr] items-center">
      <div className="h-[3rem] w-[3rem] flex items-center justify-center rounded-full bg-white border border-gray-200">
        <img
          src={currentCompany?.logo || "/default-user.jpg"}
          alt={currentCompany?.name}
          className="sm:w-[2rem] w-[1rem] h-auto"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-main-text-color text-[1.4rem]">
          {currentCompany?.name}
        </p>
        <span className="text-[1.2rem]">{rewriteRoles(currentRole)}</span>
      </div>
      <button
        onClick={() => navigate("/companies", { replace: true })}
        className="absolute right-[1.5rem]"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default CurrentCompany;
