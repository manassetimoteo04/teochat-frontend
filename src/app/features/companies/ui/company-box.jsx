import Button from "../../../shared/ui/button";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import { rewriteRoles } from "../../../utils/helpers";
import { useSelectCompanyAuth } from "../hooks/use-select-company-auth";

function CompanyBox({ company: { joinedAt, role, company } }) {
  const { name, _id: id } = company || {};
  const { select, isPending } = useSelectCompanyAuth();
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
            {new Date(joinedAt).toDateString()}
          </span>{" "}
        </p>
        <Button
          variation="secondary"
          disabled={isPending}
          onClick={() => select({ companyId: id })}
        >
          {isPending ? <SpinnerMini /> : "Selecionar Empresa"}
        </Button>
      </div>
    </div>
  );
}

export default CompanyBox;
