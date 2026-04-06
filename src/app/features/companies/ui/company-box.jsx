import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button";
import { rewriteRoles } from "../../../shared/utils/helpers";
import { ArrowRight, Building2 } from "lucide-react";

function CompanyBox({ company: { joined, role, company } }) {
  const navigate = useNavigate();
  const { name, id } = company || {};
  const joinedDate = joined ? new Date(joined) : null;

  return (
    <div className="group rounded-[1.4rem] border border-main-border-color bg-white shadow-[0_6px_18px_rgba(15,23,42,0.06)] transition-all duration-200 hover:shadow-[0_10px_22px_rgba(15,23,42,0.1)]">
      <div className="p-[1.8rem] flex flex-col gap-[1.4rem]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-[4.2rem] h-[4.2rem] rounded-[1rem] bg-main-bg-color flex items-center justify-center text-main-text-color font-semibold border border-main-border-color">
              {name?.charAt(0)}
            </div>
            <div>
              <p className="text-[1.2rem] text-secondary-text-color">
                Workspace
              </p>
              <h4 className="text-[1.7rem] font-semibold text-main-text-color truncate max-w-[18rem]">
                {name}
              </h4>
            </div>
          </div>
          <span className="text-[1.2rem] px-3 py-1 rounded-full border border-main-border-color text-main-text-color font-medium bg-white">
            {rewriteRoles(role)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[1.3rem] text-secondary-text-color">
          <Building2 size={16} />
          <span>
            Aderido em{" "}
            <strong className="text-main-text-color font-semibold">
              {joinedDate ? joinedDate.toLocaleDateString() : "--"}
            </strong>
          </span>
        </div>

        <p className="text-[1.4rem] text-secondary-text-color max-h-[6.6rem] overflow-hidden">
          {company?.description || "Workspace pronto para organizar sua equipe."}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-[1.2rem] text-secondary-text-color">
            Clique para abrir
          </div>
          <Button
            variation="secondary"
            className="w-auto px-4"
            onClick={() => navigate(`/${id}/`)}
          >
            Abrir <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CompanyBox;
