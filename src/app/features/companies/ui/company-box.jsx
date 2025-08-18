import SpinnerMini from "../../../shared/ui/SpinnerMini";
import { useSelectCompanyAuth } from "../hooks/use-select-company-auth";

function CompanyBox({ company: { joinedAt, role, company } }) {
  const { name, _id: id } = company || {};
  console.log(company);
  const { select, isPending } = useSelectCompanyAuth();
  return (
    <div className="shadow-sm bg-gray-50 border rounded-xl">
      <div className="border-b flex justify-between items-center p-[1rem_2rem] border-main-border-color">
        <h4 className="text-[1.8rem]">{name}</h4>
        <img src="./default-user.jpg" alt="" className="w-[4rem]" />
      </div>
      <div className="p-[2rem] text-secondary-text-color  flex flex-col">
        <p>
          Papel: <span className="text-main-text-color">{role}</span>
        </p>
        <p>
          Aderido aos:
          <span className="text-main-text-color">
            {new Date(joinedAt).toDateString()}
          </span>{" "}
        </p>
        <button
          disabled={isPending}
          onClick={() => select({ companyId: id })}
          className="bg-main-bg-color p-[1rem_2rem] disabled:opacity-50  rounded-full text-main-text-color mt-3 border border-main-border-color hover:border-main-color hover:text-main-color"
        >
          {isPending ? <SpinnerMini /> : "Selecionar Empresa"}
        </button>
      </div>
    </div>
  );
}

export default CompanyBox;
