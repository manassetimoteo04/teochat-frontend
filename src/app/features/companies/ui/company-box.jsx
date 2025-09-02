import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import { rewriteRoles } from "../../../shared/utils/helpers";

function CompanyBox({ company: { joined, role, company } }) {
  const navigate = useNavigate();
  const { name, id } = company || {};
  return (
    <div className="shadow-sm bg-gray-50 border rounded-xl">
      <div className="border-b flex justify-between items-center p-[1rem_2rem] border-main-border-color">
        <h4 className="text-[1.8rem]">{name}</h4>
        <img src="/default-user.jpg" alt="" className="w-[4rem]" />
      </div>
      <div className="p-[2rem] text-secondary-text-color  flex flex-col">
        <p>
          Papel:{" "}
          <span className="text-main-text-color">{rewriteRoles(role)}</span>
        </p>
        <p>
          Aderido aos:
          <span className="text-main-text-color">
            {new Date(joined).toDateString()}
          </span>{" "}
        </p>
        <Button variation="secondary" onClick={() => navigate(`/${id}/`)}>
          Selecionar Empresa
        </Button>
      </div>
    </div>
  );
}

export default CompanyBox;
