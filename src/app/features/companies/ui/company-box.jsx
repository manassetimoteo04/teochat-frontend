import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button";
import { rewriteRoles } from "../../../shared/utils/helpers";
import { ArrowRight } from "lucide-react";

function CompanyBox({ company: { joined, role, company } }) {
  const navigate = useNavigate();
  const { name, id } = company || {};

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-[5rem] h-[5rem] rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
            {name?.charAt(0)}
          </div>
          <h4 className="text-[1.6rem] font-semibold text-gray-800 truncate">
            {name}
          </h4>
        </div>

        <span className="text-sm px-3 py-1 rounded-full bg-green-50 text-green-600 font-medium">
          {rewriteRoles(role)}
        </span>
      </div>

      <div className="px-6 py-5 flex flex-col gap-4">
        <div className="text-gray-500">
          Aderido em
          <span className="ml-1 text-gray-700 font-medium">
            {new Date(joined).toLocaleDateString()}
          </span>
        </div>
        <p>{company.description}</p>
        <Button
          variation="secondary"
          className="mt-2 group-hover:bg-green-600 group-hover:text-white transition-colors"
          onClick={() => navigate(`/${id}/`)}
        >
          Entrar na empresa <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default CompanyBox;
